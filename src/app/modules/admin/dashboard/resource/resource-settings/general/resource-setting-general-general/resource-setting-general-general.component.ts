import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ResourceRo } from 'generated/models';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom, map, Observable, startWith } from 'rxjs';
import { constants } from 'app/shared/constants';
import { TIMEZONES } from '../../../resurce-setting-rule/timezones';

@Component({
  selector: 'app-resource-setting-general-general',
  templateUrl: './resource-setting-general-general.component.html',
  styleUrls: ['./resource-setting-general-general.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceSettingGeneralGeneralComponent implements OnInit {
  @Input() settings: any;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('managerInput') managerInput: ElementRef<HTMLInputElement>;
  form: FormGroup;

  // tags list
  separatorKeysCodesTags: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags = [];
  tags = [];
  allTags = [];
  tagsEditMode: boolean = false;

  // manager chip
  separatorKeysCodesManager: number[] = [ENTER, COMMA];
  managerCtrl = new FormControl();
  filteredManagers: Observable<any[]>;
  managers = [];
  allManagers = [];

  isTagsDirty = false;
  isManagersDirty = false;

  timezones = TIMEZONES;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: '',
      resourceClass: '',
      resourceType: '',
      timezone: '',
      description: '',
    });

    this._resourceService.getOrgMembers(1).subscribe(({ body }) => {
      const { data, statusCode } = body;
      if (statusCode !== 200) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
        return;
      }

      this.allManagers = data;

      this.getCurrentResourceData();
    });

    this.filteredManagers = this.managerCtrl.valueChanges.pipe(
      startWith(null),
      map((manager: any) => (manager ? this._filterManager(manager) : this.allManagers.slice())),
    );
  }

  async onSubmit() {
    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    const _resource = {
      name: this.form.value.name,
      timezone: this.form.value.timezone,
      description: this.form.value.description,
      active: true,
      user: 1,
      resourceType: this.form.value.resourceType,
      resourceClass: this.form.value.resourceClass,
    };
    if (this.isManagersDirty) {
      _resource['managers'] = this.managers.map((manager) => ({
        organization: manager.organization.id,
        user: manager.user.id,
      }));
    }
    if (this.isTagsDirty) {
      _resource['tags'] = this.tags.map((tag) => ({ title: tag }));
    }

    try {
      await lastValueFrom(this._resourceService.updateResource(selectedResourceId, _resource));
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
    } catch (error) {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }

  // TAG METHODS //
  /**
   * Toggle the tags edit mode
   */
  toggleTagsEditMode(): void {
    this.tagsEditMode = !this.tagsEditMode;
  }

  /**
   * Filter tags
   *
   * @param event
   */
  filterTags(event): void {
    // Get the value
    const value = event.target.value.toLowerCase();

    // Filter the tags
    this.filteredTags = this.tags.filter((tag) => tag.title.toLowerCase().includes(value));
  }

  /**
   * Filter tags input key down event
   *
   * @param event
   */
  filterTagsInputKeyDown(event): void {
    // Return if the pressed key is not 'Enter'
    if (event.key !== 'Enter') {
      return;
    }

    // If there is no tag available...
    if (this.filteredTags.length === 0) {
      // Create the tag
      this.createTag(event.target.value);

      // Clear the input
      event.target.value = '';

      // Return
      return;
    }
  }

  /**
   * Create a new tag
   *
   * @param title
   */
  createTag(title: string): void {
    this.tags.push(title);
    this.filteredTags.push(title);
    this.isTagsDirty = true;
  }

  /**
   * Update the tag title
   *
   * @param tag
   * @param event
   */
  updateTagTitle(tag: any, event): void {
    // Update the title on the tag
    tag = event.target.value;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Delete the tag
   *
   * @param tag
   */
  deleteTag(tag: any): void {
    this.filteredTags.splice(this.filteredTags.indexOf(tag), 1);
    this.tags.splice(this.tags.indexOf(tag), 1);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Add tag to the product
   *
   * @param tag
   */
  addTag(tag: any): void {
    // Add the tag
    this.tags.unshift(tag);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove tag from the product
   *
   * @param tag
   */
  removeTag(tag: any): void {
    // Remove the tag
    this.tags.splice(
      this.tags.findIndex((item) => item === tag.id),
      1,
    );

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Toggle product tag
   *
   * @param tag
   * @param change
   */
  toggleProductTag(tag: any, change: MatCheckboxChange): void {
    if (change.checked) {
      this.addTag(tag);
    } else {
      this.removeTag(tag);
    }
  }

  /**
   * Should the create tag button be visible
   *
   * @param inputValue
   */
  shouldShowCreateTagButton(inputValue: string): boolean {
    return !!!(inputValue === '' || this.tags.findIndex((tag) => tag.toLowerCase() === inputValue.toLowerCase()) > -1);
  }

  // manager chip
  addManager(event: MatChipInputEvent): void {
    this.isManagersDirty = true;
    const value = (event.value || '').trim();

    if (value) {
      this.managers.push(value);
    }

    event.chipInput.clear();

    this.managerCtrl.setValue(null);
  }

  removeManager(fruit: string): void {
    const index = this.managers.indexOf(fruit);

    if (index >= 0) {
      this.managers.splice(index, 1);
    }
  }

  selectedManager(event: MatAutocompleteSelectedEvent): void {
    this.managers.push(this.allManagers.filter((man) => man.name === event.option.viewValue)[0]);
    this.managerInput.nativeElement.value = '';
    this.managerCtrl.setValue(null);
  }

  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) => tag.toLowerCase().includes(filterValue));
  }

  private _filterManager(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.allManagers.filter(({ name }) => name.toLowerCase().includes(filterValue));
  }

  private getCurrentResourceData() {
    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    this._resourceService.getResource(selectedResourceId).subscribe(({ body }) => {
      if (body.statusCode !== 200) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
        return;
      }
      const data = body.data[0];
      this.form.setValue({
        name: data.name || '',
        resourceClass: data.resourceClass || 'equipement',
        resourceType: data.resourceType || 'reservable',
        timezone: data.timezone || TIMEZONES[0].name,
        description: data.description || '',
      });
      this.tags = data.tags.map((tag) => tag.title);
      this.filteredTags = data.tags.map((tag) => tag.title);
      this.allTags = data.tags.map((tag) => tag.title);
      this.managers = this.allManagers.filter((man) => data.managers.map((dman) => dman.id === man.id).length > 0);
    });
  }
}
