import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-setting-tag',
  templateUrl: './resource-setting-tag.component.html',
  styleUrls: ['./resource-setting-tag.component.scss'],
})
export class ResourceSettingTagComponent implements OnInit {
  // TAGS
  tags = [];
  tagsEditMode: boolean = false;
  filteredTags = [];

  constructor() {}

  ngOnInit(): void {}

  /**
   * Toggle the tags edit mode
   */
  toggleTagsEditMode(): void {
    this.tagsEditMode = !this.tagsEditMode;
  }

  /**
   * Should the create tag button be visible
   *
   * @param inputValue
   */
  shouldShowCreateTagButton(inputValue: string): boolean {
    return !!!(inputValue === '' || this.tags.findIndex((tag) => tag.toLowerCase() === inputValue.toLowerCase()) > -1);
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
}
