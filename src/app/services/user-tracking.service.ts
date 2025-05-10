import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserTrackingService {
    private clickCountSubject = new BehaviorSubject<number>(0);
    public clickCount$ = this.clickCountSubject.asObservable();

    private charCountSubject = new BehaviorSubject<number>(0);
    public charCount$ = this.charCountSubject.asObservable();

    private chatCountSubject = new BehaviorSubject<number>(0);
    public chatCount$ = this.chatCountSubject.asObservable();

    private responseCharCountSubject = new BehaviorSubject<number>(0);
    public responseCharCount$ = this.responseCharCountSubject.asObservable();

    private loginTimeSubject = new BehaviorSubject<Date | null>(null);
    public loginTime$ = this.loginTimeSubject.asObservable();

    constructor() { }

    incrementClicks(): void {
        this.clickCountSubject.next(this.clickCountSubject.value + 1);
    }

    addChars(count: number): void {
        this.charCountSubject.next(this.charCountSubject.value + count);
    }

    incrementChatCount(): void {
        this.chatCountSubject.next(this.chatCountSubject.value + 1);
    }

    addResponseChars(count: number): void {
        this.responseCharCountSubject.next(this.responseCharCountSubject.value + count);
    }

    setLoginTime(time: Date): void {
        this.loginTimeSubject.next(time);
    }

    getSessionDuration(): string {
        if (!this.loginTimeSubject.value) {
            return '00:00:00';
        }

        const now = new Date();
        const diff = now.getTime() - this.loginTimeSubject.value.getTime();

        // Convert to seconds and round up
        const totalSeconds = Math.ceil(diff / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    reset(): void {
        this.clickCountSubject.next(0);
        this.charCountSubject.next(0);
        this.chatCountSubject.next(0);
        this.responseCharCountSubject.next(0);
        this.loginTimeSubject.next(null);
    }
}
