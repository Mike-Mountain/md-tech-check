import {FormControl} from "@angular/forms";

export function createIndividualFields(title: string, body: string) {
  return {
    title: new FormControl(title),
    body: new FormControl(body)
  }
}
