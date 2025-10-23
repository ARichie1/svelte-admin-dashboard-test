<script>
    import { users } from '../stores/user';
    let {query, onEdit, onDelete} = $props()
</script>


{#if $users.length === 0}
  <div class="empty card">No users found.</div>
{:else}
<div class="table-container">
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
      {#each (query ? $users.filter(user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)) : $users) as user (user.id)}
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><span class="role" style="text-transform: uppercase;">{user.role}</span></td>
          <td style="display:flex;gap:8px;">
            <button class="btn ghost small" onclick={() => onEdit?.(user.id)}>Edit</button>
            <button class="btn small delete" onclick={() => onDelete?.(user)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
</table>
</div>
{/if}
