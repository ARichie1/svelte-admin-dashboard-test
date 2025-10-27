<script>
    import { users } from '../stores/user';
    let {query, onEdit, onDelete} = $props()
</script>


{#if $users.length === 0}
  <div class="empty card">No users found.</div>
{:else}
<div class="table-container scrollable">
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
                <td class="name-column">{user.name}</td>
                <td class="email-column">{user.email}</td>
                <td><span class="role" style="text-transform: uppercase;">{user.role}</span></td>
                <td>
                    <div class="actions-container">
                        <button class="btn ghost small" onclick={() => {
                            onEdit?.(user.id)
                            console.log(user.id);
                            
                            }}>
                            Edit</button>
                        <button class="btn small delete" onclick={() => onDelete?.(user)}>Delete</button>
                    </div>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
{/if}
