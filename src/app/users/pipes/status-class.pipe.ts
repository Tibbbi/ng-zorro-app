import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusClass',
  standalone: true
})
export class StatusClassPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.toLowerCase() === 'active' ? 'status-active' : 'status-inactive';
  }
}
