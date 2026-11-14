<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import ActionButton from '../atoms/ActionButton.svelte';

  interface QuickLoginCardProperties {
    onSelectRole: (emailAddress: string, plainPassword: string) => void;
  }

  const { onSelectRole }: QuickLoginCardProperties = $props();
</script>

<div class="space-y-3 rounded-xl border border-accent-border bg-surface-subtle p-4">
  <div class="flex items-center gap-2 text-xs font-bold tracking-wider text-accent uppercase">
    <IconSymbol name="bolt" sizeInPixels={16} customClass="text-accent" />
    <span>Quick Login (Mode Prototipe)</span>
  </div>
  <p class="text-xs leading-relaxed text-content-muted">
    Gunakan tombol di bawah untuk mengisi kredensial akun pengelola kursus secara otomatis:
  </p>
  <div class="grid grid-cols-1 gap-2 pt-1">
    <ActionButton
      buttonType="button"
      variantStyle="primary"
      sizeScale="small"
      leadingIcon="admin_panel_settings"
      customClass="w-full text-xs font-bold justify-center"
      onClickHandler={() => onSelectRole('admin@edukomputer.ac.id', 'admin123')}
    >
      Isi Otomatis Akun Admin / Instruktur
    </ActionButton>
  </div>
</div>
