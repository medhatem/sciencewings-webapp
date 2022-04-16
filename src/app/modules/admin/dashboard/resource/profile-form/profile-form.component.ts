import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ResourceProfileFormComponent implements OnInit {
  @ViewChild('managerInput') managerInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  form!: FormGroup;
  btnTitle: string = 'Add';
  params: any;

  // TAGS
  tags = [];
  tagsEditMode: boolean = false;
  filteredTags = [];

  // MANAGERS
  separatorKeysCodes: number[] = [ENTER, COMMA];
  managerCtrl = new FormControl();
  filteredManagers: Observable<any[]>;
  managers = [];
  allManagers = [];

  private resource;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _resourceService: ResourceService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {
    this.route.params.subscribe((params) => {
      this.params = params;
      this.btnTitle = params.id === 'create' ? 'Add' : 'Update';
    });
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: '',
      description: '',
      timezone: '',
    });

    this._resourceService.getOrgMembers().subscribe(({ body, error }) => {
      if (error?.statusCode === 500) {
        this._toastrService.showError(error.errorMessage, 'Something went wrong!');
      }
      this.allManagers = body.members;
      this.filteredManagers = this.managerCtrl.valueChanges.pipe(
        startWith(null),
        map((manager: any) => (manager ? this._filter(manager.name) : this.allManagers.slice())),
      );
    });

    if (this.params.id !== 'create') {
      this._resourceService.getResource(this.params.id).subscribe(({ statusCode, body, errorMessage }) => {
        if (statusCode === 500) {
          this._toastrService.showError(errorMessage, 'Something went wrong!');
        }
        this.form.setValue({
          name: body.name,
          description: body.description,
          timezone: body.timezone,
        });
        this.resource = body.resources;
        this.tags = body.tags.map((tag) => tag.title);
        this.filteredTags = this.tags;
        this.managers = body.managers;
      });
    }
  }

  async onSubmit() {
    const _resource = {
      name: this.form.value.name,
      timezone: this.form.value.timezone,
      description: this.form.value.description,
      active: true,
      organization: 1,
      user: 1,
      resourceType: 'USER',
      tags: this.tags.map((tag) => ({ title: tag })),
      managers: this.managers.map((manager) => ({
        organization: manager.organization,
        user: manager.user,
      })),
    };
    if (this.params.id === 'create') {
      await this._resourceService.createResource(_resource).subscribe((response) => {
        if (response.statusCode === 500) {
          this._toastrService.showError('Something went wrong!');
        }
      });
    } else {
      this._resourceService
        .updateResource(this.params.id, {
          ...this.resource,
          ..._resource,
        })
        .subscribe((response) => {
          if (response.statusCode === 500) {
            this._toastrService.showError('Something went wrong!');
          }
        });
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
    const tag = {
      title,
    };
    this.tags.push(title);
    this.filteredTags.push(title);
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
  addTagToProduct(tag: any): void {
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
  removeTagFromProduct(tag: any): void {
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
      this.addTagToProduct(tag);
    } else {
      this.removeTagFromProduct(tag);
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

  // MANAGERS METHODS //

  removeManager(manager: string): void {
    const index = this.managers.indexOf(manager);

    if (index >= 0) {
      this.managers.splice(index, 1);
    }
  }

  selectedManager(event: MatAutocompleteSelectedEvent): void {
    const managersListLength = this.managers.filter(({ name }) => name === event.option.viewValue)?.length;
    if (managersListLength === 0) {
      this.managers.push(...this.allManagers.filter((man) => man.name === event.option.viewValue));
      this.managerInput.nativeElement.value = '';
      this.managerCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allManagers.filter((manager) => manager.toLowerCase().includes(filterValue));
  }
}
