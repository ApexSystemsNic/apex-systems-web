"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact } from "@/content/site-content";
import { buildWhatsAppUrl } from "@/content/contact-channels";
import { getContactErrors } from "@/lib/contact-validation";
import {
  buildContactMessage,
  emptyContactFormData,
  type ContactFormData,
} from "@/lib/contact-message";
import { ActionButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/MotionPrimitives";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactFields } from "./ContactFields";
import { ContactPreview } from "./ContactPreview";
import { ContactProgress, STEP_HELP, STEP_LABELS } from "./ContactProgress";
import { ContactSubmitted } from "./ContactSubmitted";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ContactFormData>(emptyContactFormData);
  const [touchedStep, setTouchedStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousView = useRef("1-false");

  useEffect(() => {
    const view = `${step}-${submitted}`;
    if (previousView.current !== view) {
      previousView.current = view;
      titleRef.current?.focus();
    }
  }, [step, submitted]);

  useEffect(() => {
    if (attempt > 0) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [attempt]);

  function update<Key extends keyof ContactFormData>(
    key: Key,
    value: ContactFormData[Key],
  ) {
    setData((previous) => ({ ...previous, [key]: value }));
  }

  const stepErrors = getContactErrors(step, data);
  const showError = (field: string) => touchedStep >= step && stepErrors.includes(field);
  const errorId = (field: string) => `${field}-error`;
  const describedBy = (field: string) => (showError(field) ? errorId(field) : undefined);

  function goNext() {
    setTouchedStep(step);
    if (stepErrors.length === 0) setStep((current) => Math.min(3, current + 1));
    else setAttempt((current) => current + 1);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      goNext();
      return;
    }

    setTouchedStep(3);
    if (stepErrors.length === 0) {
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      setSubmitted(true);
    } else {
      setAttempt((current) => current + 1);
    }
  }

  function editContact() {
    setSubmitted(false);
    setStep(1);
    setTouchedStep(0);
  }

  const solutionLabel =
    contact.solutionOptions.find((option) => option.value === data.solucion)?.label ?? "";
  const message = buildContactMessage(data, solutionLabel);

  return (
    <Section id="contacto" tone="surface" className="contact-section overflow-hidden" innerClassName="relative">
      <div className="contact-section__orb" aria-hidden="true" />
      <Reveal>
        <SectionHeading
          eyebrow="Hagámoslo conversable"
          title={contact.title}
          intro={contact.description}
          className="relative max-w-3xl"
        />
      </Reveal>

      <Reveal className="contact-layout relative">
        <div className="contact-card rounded-[1.5rem] border border-line bg-background shadow-elevated">
          {!submitted ? (
            <>
              <ContactProgress step={step} />
              <h3 ref={titleRef} tabIndex={-1} className="contact-step-title">
                Paso {step} de 3: {STEP_LABELS[step - 1]}
              </h3>
              <p className="contact-step-help">{STEP_HELP[step - 1]}</p>

              <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
                <ContactFields
                  step={step}
                  data={data}
                  update={update}
                  showError={showError}
                  errorId={errorId}
                  describedBy={describedBy}
                />

                <div className="contact-actions mt-6 flex items-center justify-between gap-3">
                  <ActionButton
                    type="button"
                    variant="secondary"
                    onClick={() => setStep((current) => Math.max(1, current - 1))}
                    disabled={step === 1}
                    className={step === 1 ? "invisible" : ""}
                  >
                    Atrás
                  </ActionButton>

                  <ActionButton type="submit" variant="primary">
                    {step < 3
                      ? step === 1
                        ? "Siguiente: tu proyecto"
                        : "Siguiente: contacto"
                      : contact.submitCta}
                  </ActionButton>
                </div>
              </form>
            </>
          ) : (
            <ContactSubmitted
              message={message}
              whatsappHref={buildWhatsAppUrl(message)}
              titleRef={titleRef}
              onEdit={editContact}
            />
          )}
        </div>

        <ContactPreview data={data} message={message} submitted={submitted} />
      </Reveal>
    </Section>
  );
}
