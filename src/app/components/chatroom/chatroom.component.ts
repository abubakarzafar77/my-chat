import { Component, OnInit, ViewChild, ElementRef, OnChanges, AfterViewChecked, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
    selector: 'app-chatroom',
    templateUrl: './chatroom.component.html',
    styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked, AfterContentChecked, AfterContentInit, AfterViewInit, OnChanges {
    @ViewChild('scroller') private feedContainer: ElementRef;

    constructor() { }

    ngOnInit() {

    }
    scrollToButtom(): void {
        this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
        // console.log(this.feedContainer.nativeElement.scrollHeight);
    }

    ngAfterViewChecked() {
        this.scrollToButtom();
        // console.log('AfterViewChecked');
    }
    ngAfterContentChecked() {
        // console.log('AfterContentChecked');
    }
    ngAfterViewInit() {
        // console.log('AfterViewInit');
    }
    ngAfterContentInit() {
        // console.log('AfterContentInit');
    }
    ngOnChanges() {
        // console.log('OnChanges');
    }


}
