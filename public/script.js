const postBtn = document.getElementById('post-btn');
const getBtn = document.getElementById('get-btn');
const userList = document.getElementById('user-list');

postBtn.onclick = () => {
    const name = document.getElementById('name').value.trim();
    const age = Number(document.getElementById('age').value);
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age })
    })
        .then(res => res.json())
        .then(user => {
            alert(`Eklendi: ${user.name} (${user.age})`);
            renderUsers();
        });
};

getBtn.onclick = renderUsers;

function renderUsers() {
    fetch('/api/users')
        .then(res => res.json())
        .then(users => {
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.age})`;

                const delBtn = document.createElement('button');
                delBtn.textContent = 'del';
                delBtn.onclick = () => deleteUser(user.id);
                li.appendChild(delBtn);

                userList.appendChild(li);
            });

        });
}

function deleteUser(id) {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.status === 204) {
                renderUsers();
            } else {
                alert('Silme hatası! Kod: ' + res.status);
            }
        });
}


renderUsers();
