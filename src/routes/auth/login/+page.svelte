<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import {
    ContentCard,
    TextInput,
    ActionButton,
    AlertMessage,
    BrandLogo,
    QuickLoginCard,
  } from '$lib/components';

  let { data, form }: PageProps = $props();

  let emailAddressInput = $state('');
  let plainPasswordInput = $state('');
  let isSubmitting = $state(false);

  $effect(() => {
    if (form?.emailAddress) {
      emailAddressInput = form.emailAddress;
    }
  });

  function handleQuickFill(email: string, pass: string): void {
    emailAddressInput = email;
    plainPasswordInput = pass;
  }
</script>

<div class="mx-auto w-full max-w-md space-y-6">
  <!-- Brand Heading (matching sains-desa) -->
  <div class="flex flex-col items-center space-y-3 text-center">
    <BrandLogo size="large" clickable={false} customClass="justify-center" />
    <div class="space-y-1">
      <h2 class="text-xl font-bold tracking-tight text-content-heading">
        Portal Admin & Instruktur Kursus
      </h2>
      <p class="text-xs text-content-muted">
        Masuk ke sistem manajemen EduKomputer untuk mengelola modul pembelajaran, artikel panduan, kuis evaluasi, dan memantau perkembangan siswa.
      </p>
    </div>
  </div>

  <!-- Quick Login Helper -->
  <QuickLoginCard onSelectRole={handleQuickFill} />

  <!-- Form Card -->
  <ContentCard cardPadding="large">
    <form
      method="POST"
      action="?/login"
      class="space-y-4"
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          await update();
          isSubmitting = false;
        };
      }}
    >
      {#if form?.errorMessage}
        <AlertMessage
          alertTone="error"
          alertTitle="Autentikasi Gagal"
          alertMessage={form.errorMessage}
        />
      {/if}

      <div>
        <label for="emailAddress" class="block text-xs font-bold text-content-heading mb-1.5">
          Alamat Email Administrator / Instruktur <span class="text-status-error">*</span>
        </label>
        <TextInput
          identifier="emailAddress"
          inputName="emailAddress"
          inputType="email"
          bind:inputValue={emailAddressInput}
          placeholderText="admin@edukomputer.ac.id"
          isRequired={true}
        />
      </div>

      <div>
        <label for="plainPassword" class="block text-xs font-bold text-content-heading mb-1.5">
          Kata Sandi Akun <span class="text-status-error">*</span>
        </label>
        <TextInput
          identifier="plainPassword"
          inputName="plainPassword"
          inputType="password"
          bind:inputValue={plainPasswordInput}
          placeholderText="••••••••••••"
          isRequired={true}
        />
      </div>

      <div class="pt-2">
        <ActionButton
          buttonType="submit"
          variantStyle="primary"
          sizeScale="large"
          leadingIcon="login"
          customClass="w-full font-bold justify-center"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          loadingText="Memverifikasi Akun..."
        >
          Masuk ke Dashboard Kursus
        </ActionButton>
      </div>
    </form>
  </ContentCard>
</div>
