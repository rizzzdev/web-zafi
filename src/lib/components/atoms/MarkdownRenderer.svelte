<script lang="ts">
  import { marked } from 'marked';

  interface MarkdownRendererProperties {
    readonly content: string;
    readonly classNames?: string;
    readonly isCardPreview?: boolean;
  }

  const {
    content,
    classNames = '',
    isCardPreview = false,
  }: MarkdownRendererProperties = $props();

  const processedContent = $derived.by(() => {
    if (!content) return '';
    if (!isCardPreview) return content;
    return content
      .replace(/^#\s+[^\n]+\n*/m, '')
      .replace(/^---+\s*$/gm, '')
      .trim();
  });

  const renderedHtml = $derived(
    marked.parse(processedContent, { async: false, breaks: true }) as string
  );
</script>

<div
  class="prose max-w-none text-content leading-relaxed {isCardPreview
    ? 'prose-preview text-xs text-content'
    : ''} {classNames}"
>
  {@html renderedHtml}
</div>

<style>
  :global(.prose-preview p) {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--color-content);
  }

  :global(.prose-preview strong) {
    color: var(--color-content-heading);
    font-weight: 700;
  }

  :global(.prose-preview em) {
    color: var(--color-accent);
    font-style: italic;
  }

  :global(.prose-preview code) {
    background-color: var(--color-surface-subtle);
    color: var(--color-accent);
    padding: 0.1rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-family: ui-monospace, monospace;
  }

  :global(.prose h1) {
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--color-content-heading);
    line-height: 1.25;
  }

  :global(.prose h2) {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--color-content-heading);
    border-bottom: 1px solid var(--color-border-subtle);
    padding-bottom: 0.375rem;
  }

  :global(.prose h3) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.375rem;
    color: var(--color-content-heading);
  }

  :global(.prose p) {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--color-content);
  }

  :global(.prose ul) {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }

  :global(.prose ol) {
    list-style-type: decimal;
    padding-left: 1.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }

  :global(.prose li) {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    color: var(--color-content);
  }

  :global(.prose blockquote) {
    border-left: 3px solid var(--color-accent);
    background-color: var(--color-surface);
    padding: 0.625rem 0.875rem;
    border-radius: 0 0.5rem 0.5rem 0;
    margin: 0.875rem 0;
    font-style: italic;
    color: var(--color-content);
    border-top: 1px solid var(--color-border-subtle);
    border-right: 1px solid var(--color-border-subtle);
    border-bottom: 1px solid var(--color-border-subtle);
  }

  :global(.prose table) {
    width: 100%;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    border-collapse: collapse;
    font-size: 0.8125rem;
  }

  :global(.prose th) {
    background-color: var(--color-surface-subtle);
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border-subtle);
    color: var(--color-content-heading);
    font-weight: 600;
    text-align: left;
  }

  :global(.prose td) {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border-subtle);
    color: var(--color-content);
  }

  :global(.prose strong) {
    color: var(--color-content-heading);
    font-weight: 700;
  }

  :global(.prose em) {
    color: var(--color-accent);
    font-style: italic;
  }

  :global(.prose code) {
    background-color: var(--color-surface-subtle);
    color: var(--color-accent);
    padding: 0.125rem 0.375rem;
    border-radius: 0.375rem;
    font-size: 0.8125em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    border: 1px solid var(--color-border-subtle);
  }

  :global(.prose pre) {
    background-color: var(--color-surface-subtle);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    border: 1px solid var(--color-border-subtle);
  }

  :global(.prose pre code) {
    background-color: transparent;
    padding: 0;
    border: none;
    color: var(--color-content);
  }

  :global(.prose hr) {
    border-color: var(--color-border-subtle);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
