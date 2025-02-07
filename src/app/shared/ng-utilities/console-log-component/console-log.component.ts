import {
  Component,
  Input
} from "@angular/core";

/**
 * For debugging purposes only
 * */
@Component({
  selector: 'app-console-log',
  template: '',
  standalone: true,
})
export class ConsoleLogComponent {
  @Input()
  set message(msg: any) {
    console.log(msg);
  }
}
