document.getElementById('quizForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            var correctAnswer = '3';
            var selectedOption = document.querySelector('input[name="answer"]:checked');
            
            if (!selectedOption) {
                alert('Выберите ответ!');
                return;
            }
            
            var resultMessageDiv = document.querySelector('.result-message');
            resultMessageDiv.style.display = 'block'; // Показываем блок результата
            
            if (selectedOption.value === correctAnswer) {
                resultMessageDiv.textContent = 'Правильно!';
                resultMessageDiv.style.color = 'green';
            } else {
                resultMessageDiv.textContent = 'Неправильно. Перекрёсток неравнозначный. Главная дорога меняет направление. Транспортные средства, находящиеся на главной дороге, имеют преимущество, между собой руководствуются «правилом правой руки». После их проезда, пользуясь этим же правилом, проезжают транспортные средства, находящиеся на второстепенной дороге. Первым проезжаете Вы, никому не уступая.';
                resultMessageDiv.style.color = 'red';
            }
        });