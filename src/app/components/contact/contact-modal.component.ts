import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@/pipes/translate.pipe';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact-modal.component.html',
})
export class ContactModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  name = '';
  email = '';
  subject = '';
  message = '';
  sending = false;
  errorMsg = '';
  successMsg = '';

  onBackdrop(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    if (target && target.dataset['backdrop'] === 'true') {
      this.close.emit();
    }
  }

  constructor(private contactService: ContactService) {}

  async submit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.errorMsg = 'Por favor, completa nombre, email y mensaje.';
      return;
    }
    this.sending = true;
    try {
      const res = await this.contactService.send({
        name: this.name.trim(),
        email: this.email.trim(),
        subject: this.subject.trim(),
        message: this.message.trim(),
      });
      if (res.ok) {
        this.successMsg = 'Mensaje enviado correctamente. ¡Gracias!';
        // Limpia campos y cierra modal tras breve pausa
        setTimeout(() => {
          this.name = '';
          this.email = '';
          this.subject = '';
          this.message = '';
          this.handleClose();
        }, 1200);
      } else {
        this.errorMsg = res.message || 'No se pudo enviar el mensaje.';
    }
  } catch (e) {
      this.errorMsg = 'Error de red al enviar el mensaje.';
    } finally {
      this.sending = false;
    }
  }

  handleClose() {
    // Asegura que los mensajes se limpien al cerrar el modal
    this.errorMsg = '';
    this.successMsg = '';
    this.close.emit();
  }
}