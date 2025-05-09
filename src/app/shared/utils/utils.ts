import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Helpers{

    copyToClipboard(text: string){
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
          }).catch(err => {
            console.error('Error copying to clipboard', err);
          });
    }

    handleShareProfile(userName: string){
        const baseUrl = window.location.origin;
        this.copyToClipboard(`${baseUrl}/developer/${userName}`);
      }
}