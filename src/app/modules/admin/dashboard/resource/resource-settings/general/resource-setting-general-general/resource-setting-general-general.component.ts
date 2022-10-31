import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { constants } from 'app/shared/constants';
import { UpdateResource } from 'app/models/resources/resource';
import { Router } from '@angular/router';

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

  isTagsDirty = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: '',
      resourceClass: '',
      resourceType: '',
      description: '',
    });

    this._resourceService.getOrgMembers(1).subscribe(({ body }) => {
      const { data, statusCode } = body;
      if (statusCode !== 200) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
        return;
      }

      this.getCurrentResourceData();
    });
  }

  async onSubmit() {
    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    const _resource = new UpdateResource({
      name: this.form.value.name,
      description: this.form.value.description,
      active: true,
      user: 1,
      organization: 1,
      resourceType: this.form.value.resourceType,
      resourceClass: this.form.value.resourceClass,
    });

    if (this.isTagsDirty) {
      _resource['tags'] = this.tags.map((tag) => ({ title: tag }));
    }

    try {
      await lastValueFrom(this._resourceService.updateResource(selectedResourceId, _resource));
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
      this._router.navigate([constants.MODULES_ROUTINGS_URLS.RESOURCES_LIST]);
    } catch (error) {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }

  toggleTagsEditMode(): void {
    this.tagsEditMode = !this.tagsEditMode;
  }

  filterTags(event): void {
    const value = event.target.value.toLowerCase();
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
      this.createTag(event.target.value);
      event.target.value = '';
      return;
    }
  }

  createTag(title: string): void {
    this.tags.push(title);
    this.filteredTags.push(title);
    this.isTagsDirty = true;
  }

  updateTagTitle(tag: any, event): void {
    // Update the title on the tag
    tag = event.target.value;
    this._changeDetectorRef.markForCheck();
  }

  deleteTag(tag: any): void {
    this.filteredTags.splice(this.filteredTags.indexOf(tag), 1);
    this.tags.splice(this.tags.indexOf(tag), 1);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  addTag(tag: any): void {
    // Add the tag
    this.tags.unshift(tag);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  removeTag(tag: any): void {
    // Remove the tag
    this.tags.splice(
      this.tags.findIndex((item) => item === tag.id),
      1,
    );

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

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

  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) => tag.toLowerCase().includes(filterValue));
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
        description: data.description || '',
      });
      this.tags = data.tags.map((tag) => tag.title);
      this.filteredTags = data.tags.map((tag) => tag.title);
      this.allTags = data.tags.map((tag) => tag.title);
    });
  }
}
