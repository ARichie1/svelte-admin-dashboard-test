<script>
    let {onCancel, onDelete, userToDelete} = $props()
</script>
    
    
    
<div class="deleteForm">
    <h2 style="text-transform: uppercase;">Are You Want To Delete This User ?</h2>
    <div>
        <p>{userToDelete.name}</p>
        <p>{userToDelete.role}</p>
    </div>
    <div class="button-container">
        <button class="btn ghost small" on:click={() => onCancel?.()}>Cancel</button>
        <button class="btn small delete" on:click={() => onDelete?.(userToDelete.id)}>Delete</button>
    </div>
</div>

<style>
    .deleteForm{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    p{
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }
    p:nth-child(2){
        height: 40px; width: 200px;
        display: flex; align-items: center;
        justify-content: center;
        background: var(--accent);
        text-align: center;
        border-radius: 7px;
        color: var(--text)
    }
    .button-container{
        height: 50px;
        width: 100%; margin-top: 50px;
        display: flex; justify-content: space-evenly;
    }
    .button-container button{
        flex-basis: 150px;
    }
</style>
