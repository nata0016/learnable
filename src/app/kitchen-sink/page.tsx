"use client";

import { useState } from "react";
import {
  Button,
  Chip,
  Tag,
  Card,
  Field,
  Toggle,
  ProgressBar,
  Breadcrumb,
} from "@/components/ui";

export default function KitchenSinkPage() {
  const [chipPressed, setChipPressed] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Kitchen Sink" }]} />

      <h1 className="mt-4 text-3xl font-bold text-ink">Kitchen Sink</h1>
      <p className="mt-2 text-muted">
        QA reference rendering every design-system component in its default, hover, focus,
        disabled, error, and success states.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Button</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="primary" size="md">
            Primary md
          </Button>
          <Button variant="primary" size="sm">
            Primary sm
          </Button>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="primary" size="md" disabled>
            Disabled
          </Button>
          <Button variant="secondary" size="md" href="/">
            Renders as a link
          </Button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Chip</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Chip pressed={chipPressed} onPressedChange={setChipPressed}>
            {chipPressed ? "Pressed" : "Not pressed"}
          </Chip>
          <Chip pressed={true} onPressedChange={() => {}}>
            Always on
          </Chip>
          <Chip pressed={false} onPressedChange={() => {}} disabled>
            Disabled
          </Chip>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Tag</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Tag>Default</Tag>
          <Tag variant="ok">Completed</Tag>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Card</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-ink">Div card</h3>
            <p className="mt-1 text-sm text-muted">Default wrapper element.</p>
          </Card>
          <Card as="article">
            <h3 className="font-semibold text-ink">Article card</h3>
            <p className="mt-1 text-sm text-muted">Rendered as an &lt;article&gt;.</p>
          </Card>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Field</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Full name" placeholder="Ada Lovelace" />
          <Field
            id="email"
            label="Email"
            description="We'll only use this to send progress updates."
            placeholder="ada@example.com"
          />
          <Field
            id="username"
            label="Username"
            error="This username is already taken."
            defaultValue="ada"
          />
          <Field id="username-disabled" label="Disabled field" disabled defaultValue="ada" />
          <Field as="select" id="level" label="Level" defaultValue="beginner">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Field>
          <Field
            as="textarea"
            id="notes"
            label="Notes"
            placeholder="Anything else we should know?"
            className="sm:col-span-2"
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Toggle</h2>
        <div className="mt-4 max-w-sm space-y-4">
          <Toggle
            id="toggle-notifications"
            label="Notifications"
            description="Get a reminder for daily lessons."
            checked={notificationsOn}
            onCheckedChange={setNotificationsOn}
          />
          <Toggle
            id="toggle-disabled-off"
            label="Disabled toggle (off)"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
          <Toggle
            id="toggle-disabled-on"
            label="Disabled toggle (on)"
            checked={true}
            onCheckedChange={() => {}}
            disabled
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">ProgressBar</h2>
        <div className="mt-4 max-w-sm space-y-4">
          <ProgressBar value={30} max={100}>
            30% complete
          </ProgressBar>
          <ProgressBar value={100} max={100}>
            Lesson complete
          </ProgressBar>
        </div>
      </section>

      <section className="mt-10 pb-4">
        <h2 className="text-xl font-semibold text-ink">Breadcrumb</h2>
        <div className="mt-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Browse", href: "/browse" },
              { label: "Current lesson" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
