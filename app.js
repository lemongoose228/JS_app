new Vue({
    el: '#app',
    data: {
        noteTitle: '',
        noteContent: '',
        notePriority: 'low',
        noteStatus: 'in process', 
        notes: [],
        isEditing: false,
        editingIndex: null,
    },

    created() {
        // Загрузка заметок из localStorage при инициализации приложения
        const savedNotes = JSON.parse(localStorage.getItem('notes'));
        if (savedNotes) {
            this.notes = savedNotes;
        }

    }, 

    methods: {
        saveNote() {
            console.log(this.noteStatus);
            if (!this.noteTitle || !this.noteContent || !this.notePriority || !this.noteStatus) {
                alert("Пожалуйста, заполните все поля!");
            } else {
                if (this.isEditing) {
                    // Изменение заметки
                    this.notes[this.editingIndex] = {
                        title: this.noteTitle,
                        content: this.noteContent,
                        priority: this.notePriority,
                        status: this.noteStatus
                    };
                    this.isEditing = false;
                    this.editingIndex = null;
                } else {
                    // Добавление новой заметки
                    this.notes.push({
                        title: this.noteTitle,
                        content: this.noteContent,
                        priority: this.notePriority,
                        status: this.noteStatus
                    });
                }
            }
            
            // Очистка полей
            this.noteTitle = '';
            this.noteContent = '';
            this.notePriority = 'low';
            this.noteStatus = '';
        },
        editNote(index) {
            // Установка полей для редактирования
            this.noteTitle = this.notes[index].title;
            this.noteContent = this.notes[index].content;
            this.notePriority = this.notes[index].priority;
            this.noteStatus = this.notes[index].status;

            this.isEditing = true; // Показать, что мы редактируем
            this.editingIndex = index; // Запомнить индекс редактируемой заметки

            this.deleteNote(index); // Удаляем заметку после редактирования, чтобы можно было добавить обновлённую
        },
        deleteNote(index) {
            // Удаление заметки
            this.notes.splice(index, 1);
        },
        resetNotes() {
            this.notes = [];
            localStorage.removeItem('notes');
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        clearInputs() {
            this.noteTitle = '';
            this.noteContent = '';
        }
    }
});