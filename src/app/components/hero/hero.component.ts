import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {
    this.checkRequiredTitle();
  }

  ngOnChanges() {
    this.checkRequiredTitle();
  }

  @Input() title;
  @Input() subtitle = undefined;
  @Input() color = "is-danger";

  checkRequiredTitle() {
    if (!this.title) {
      throw new Error("Attribute 'title' is required");
    }
  }
}
