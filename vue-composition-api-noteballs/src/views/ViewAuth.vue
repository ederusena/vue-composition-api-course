<template>
  <div class="tabs is-centered">
    <ul>
      <li
        :class="{ 'is-active' : !register }"
      >
        <a @click.prevent="register = false">Login</a>
      </li>
      <li
        :class="{ 'is-active' : register }"
      >
        <a @click.prevent="register = true">Register</a>
      </li>
    </ul>
  </div>

  <div class="container login-form">
    <div class="card">
      <div class="card-content">
        <h1 class="title has-text-centered">
          {{ formTitle }}
        </h1>

        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                placeholder="Email"
                type="text"
              >
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                placeholder="Password"
                type="password"
              >
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button class="button is-link">{{ formTitle }}</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
/*
  imports
*/

  import { ref, reactive, computed } from 'vue'
  import { useStoreNotes } from '@/stores/storeNotes'


/*
  stores
*/

  const storeNotes = useStoreNotes()


/*
  register / login
*/

  const register = ref(false)


/*
  form title
*/

  const formTitle = computed(() => {
    return register.value ? 'Register' : 'Login'
  })


/*
  credentials
*/

  const credentials = reactive({
    email: '',
    password: ''
  })


/*
  submit
*/

  const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert('Please enter an email & password')
    }
    else {
      if (register.value) {
        storeNotes.firebaseRegister(credentials)
      }
      else {
        storeNotes.firebaseLogin(credentials)
      }
    }
  }

</script>

<style>
.login-form {
  max-width: 400px;
}
</style>