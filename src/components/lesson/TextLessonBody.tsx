import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import type { TextLesson } from "@/types/course";

// The page's own <h1> is the lesson title, so markdown headings are offset
// by one level: a markdown `#` becomes an <h2>, `##` becomes <h3>, etc.
const markdownComponents: Components = {
  h1: ({ children }) => <h2 className="mt-8 text-2xl font-semibold text-ink first:mt-0">{children}</h2>,
  h2: ({ children }) => <h3 className="mt-6 text-xl font-semibold text-ink">{children}</h3>,
  h3: ({ children }) => <h4 className="mt-4 text-lg font-semibold text-ink">{children}</h4>,
  p: ({ children }) => <p className="mt-4 text-base leading-7 text-ink first:mt-0">{children}</p>,
  ul: ({ children }) => (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it.
    <ul role="list" className="mt-4 list-disc space-y-2 pl-6 text-ink">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles -- Tailwind's preflight sets list-style:none, which strips ol/ul's implicit list role in Safari/VoiceOver; role="list" restores it.
    <ol role="list" className="mt-4 list-decimal space-y-2 pl-6 text-ink">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} className="text-teal underline hover:text-deep">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-4 border-line pl-4 text-muted">{children}</blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-tint px-1.5 py-0.5 font-mono text-sm text-deep">{children}</code>
  ),
};

export function TextLessonBody({ lesson }: { lesson: TextLesson }) {
  return (
    <div className="max-w-prose">
      <ReactMarkdown components={markdownComponents}>{lesson.bodyMarkdown}</ReactMarkdown>

      {lesson.figure ? (
        <figure className="mt-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-tint">
            <Image
              src={lesson.figure.src}
              alt={lesson.figure.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="mt-2 text-sm text-muted">{lesson.figure.alt}</figcaption>
        </figure>
      ) : null}
    </div>
  );
}
