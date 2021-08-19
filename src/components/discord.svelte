<script>
  import { supabaseSession } from "$lib/store";
  import supabase from "$lib/supabaseClient";

  async function login() {
    await supabase.auth.signIn({
      provider: "discord"
    })
  }
</script>

<style>
  #loginButton {
    background-color: #7289da;
  }
  #loginButton:hover {
    background-color: #5768A6;
  }
</style>

{#key $supabaseSession}
  {#if supabase.auth.user() !== null}
    <div class="block lg:flex shadow-xl w-20 lg:h-24 lg:w-60 p-4 rounded-md">
      <img class="mx-auto lg:m-0" src="https://maxcdn.icons8.com/Share/icon/Logos/discord_logo1600.png" alt="Discord Logo" />
      <div class="lg:ml-4 lg:mt-2">
        <p class="hidden text-lg lg:block"><b>Discord</b></p>
        <p class="text-center text-sm lg:text-left">{ supabase.auth.user()?.user_metadata.full_name }</p>
      </div>
    </div>
  {:else}
    <div class="flex items-center">
      <p class="text-lg mr-2 lg:hidden">SignIn</p>
      <button id="loginButton" class="h-12 w-12 rounded-full lg:h-12 lg:w-56 shadow-xl lg:rounded-3xl" on:click="{login}">
        <img class="w-8 h-8 mx-auto lg:hidden" src="https://img.icons8.com/ios-filled/150/ffffff/discord-logo.png" alt="Discord Logo"/>
        <p class="hidden text-lg text-center text-white lg:block"><b>SignIn with Discord</b></p>
      </button>
    </div>
  {/if}
{/key}