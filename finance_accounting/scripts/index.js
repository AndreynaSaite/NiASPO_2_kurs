document.addEventListener('DOMContentLoaded', function () {

    const cabinetik1 = document.getElementById('cabinet1');
    const cabinetik2 = document.getElementById('cabinet2');
    const cabinetik3 = document.getElementById('cabinet3');
    const cabinetik4 = document.getElementById('cabinet4');

    const myticket = document.getElementById('my-ticket');
    const mycabinet = document.getElementById('my-cabinet');
    const queueposition = document.getElementById('queue-position');



    const queues = {
        1: [],
        2: [],
        3: [],
        4: []
    };



    async function updatequeue(cabinetid) {
        while (true) {
            if (queues[cabinetid].length > 0){
                const ticket = queues[cabinetid].pop(); // Извлекаем последний элемент
                const ticketNumber = ticket.ticket_number;
                if (cabinetid === 1){
                    cabinetik1.innerHTML = ticketNumber;
                }
                if (cabinetid === 2){
                    cabinetik2.innerHTML = ticketNumber;
                }
                if (cabinetid === 3){
                    cabinetik3.innerHTML = ticketNumber;
                }
                if (cabinetid === 4){
                    cabinetik4.innerHTML = ticketNumber;
                }
                await new Promise(resolve => setTimeout(resolve, 10000)); // Ждем 10 секунд
            }
            else{
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    updatequeue(1);
    updatequeue(2);
    updatequeue(3);
    updatequeue(4);

    function addToQueue(data) {
        const cabinet_id = data.cabinet;
        if (queues[cabinet_id]) {
            queues[cabinet_id].push(data);
            console.log(queues);
        }
    }



    async function requestTicket(cabinet_id){
        const response = await fetch(`/api/create-ticket/${cabinet_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //data - данные ответа
        const data = await response.json();
        addToQueue(data);
        myticket.innerHTML = data.ticket_number;
        mycabinet.innerHTML = data.cabinet;
        queueposition.innerHTML = data.position_in_queue;
        console.log(data);
    }

    document.querySelector('.tickets button[name="add1"]').addEventListener('click', function () {
        const line = 1;
        requestTicket(line);
    });

    document.querySelector('.tickets button[name="add2"]').addEventListener('click', function () {
        const line = 2;
        requestTicket(line);
    });

    document.querySelector('.tickets button[name="add3"]').addEventListener('click', function () {
        const line = 3;
        requestTicket(line);
    });

    document.querySelector('.tickets button[name="add4"]').addEventListener('click', function () {
        const line = 4;
        requestTicket(line);
    });

});
