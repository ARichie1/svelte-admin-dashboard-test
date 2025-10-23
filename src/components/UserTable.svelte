<script>
    import { users } from '../stores/user';
    import { derived } from 'svelte/store';

    export let query = '';
    export let onEdit;
    export let onDelete;

    // Get The Users Array Then Filter Through It To Match The Query String
    const filtered = derived(users, $users => {
        const q = query.toLowerCase();
        return q ? $users.filter(user => user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)) : $users;
    });
</script>

{#if $filtered.length === 0}
  <div class="empty card">No users found.</div>
{:else}
  <table class="table card">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
      {#each $filtered as user (user.id)}
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><span class="role" style="text-transform: uppercase;">{user.role}</span></td>
          <td style="display:flex;gap:8px;">
            <button class="btn ghost small" on:click={() => onEdit?.(user.id)}>Edit</button>
            <button class="btn small delete" on:click={() => onDelete?.(user)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
