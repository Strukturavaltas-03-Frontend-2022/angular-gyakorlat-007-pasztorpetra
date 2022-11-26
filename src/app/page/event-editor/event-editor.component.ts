import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  event: Event = new Event();
  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.eventService
        .get(params['id'])
        .subscribe((event) => (this.event = event))
    );
  }

  onUpdate(eventform: NgForm): void {
    this.eventService.update(eventform.value).subscribe((event) => {
      this.router.navigate(['/']);
    });
  }
}
