<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import {
    ContentCard,
    TextInput,
    ActionButton,
    AlertMessage,
    BrandLogo,
    IconSymbol,
  } from '$lib/components';

  let { form }: PageProps = $props();

  let emailAddressInput = $state('');
  let plainPasswordInput = $state('');
  let isPasswordVisible = $state(false);
  let isSubmitting = $state(false);

  $effect(() => {
    if (form?.emailAddress) {
      emailAddressInput = form.emailAddress;
    }
  });
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
        <div class="relative">
          <TextInput
            identifier="plainPassword"
            inputName="plainPassword"
            inputType={isPasswordVisible ? 'text' : 'password'}
            bind:inputValue={plainPasswordInput}
            placeholderText="••••••••••••"
            isRequired={true}
            customClass="pr-10"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-content-muted hover:text-content-heading focus:outline-none transition-colors"
            onclick={() => {
              isPasswordVisible = !isPasswordVisible;
            }}
            aria-label={isPasswordVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            title={isPasswordVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            <IconSymbol
              name={isPasswordVisible ? 'visibility_off' : 'visibility'}
              sizeInPixels={18}
            />
          </button>
        </div>
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
