
document.addEventListener("DOMContentLoaded", function () {

    // Mengambil data tugas dari penyimpanan browser
    let salma_tasks = JSON.parse(
        localStorage.getItem("salma_tasks") || "[]"
    );

    // Menampilkan tugas yang tersimpan
    function salma_show_tasks() {
        const salma_list = document.getElementById("salma_task_list");

        if (!salma_list) return;

        salma_tasks.forEach(function (task, index) {
            const salma_card = document.createElement("article");
            salma_card.className = "salma_feature";

            const salma_title = document.createElement("h3");
            salma_title.textContent = task.nama;

            const salma_course = document.createElement("p");
            salma_course.textContent = "Mata Kuliah: " + task.matkul;

            const salma_deadline = document.createElement("p");
            salma_deadline.textContent = "Deadline: " + task.deadline;

            const salma_priority = document.createElement("p");
            salma_priority.textContent = "Prioritas: " + task.prioritas;

            const salma_status = document.createElement("p");
            salma_status.textContent = "Status: " + task.status;

            const salma_button = document.createElement("button");
            salma_button.textContent = "Tandai Selesai";
            salma_button.className = "salma_button";
            salma_button.style.border = "none";
            salma_button.style.cursor = "pointer";
            salma_button.style.marginTop = "12px";

            salma_button.addEventListener("click", function () {
                salma_tasks[index].status = "Selesai";
                localStorage.setItem(
                    "salma_tasks",
                    JSON.stringify(salma_tasks)
                );
                location.reload();
            });

            salma_card.append(
                salma_title,
                salma_course,
                salma_deadline,
                salma_priority,
                salma_status,
                salma_button
            );

            salma_list.appendChild(salma_card);
        });
    }

    salma_show_tasks();

    // Menyimpan tugas baru
    const salma_task_form = document.getElementById("salma_task_form");

    if (salma_task_form) {
        salma_task_form.addEventListener("submit", function (event) {
            event.preventDefault();

            const salma_new_task = {
                nama: document.getElementById("salma_nama_tugas").value,
                matkul: document.getElementById("salma_matkul").value,
                deadline: document.getElementById("salma_deadline").value,
                prioritas: document.getElementById("salma_prioritas").value,
                deskripsi: document.getElementById("salma_deskripsi").value,
                status: "Dalam Proses"
            };

            salma_tasks.push(salma_new_task);

            localStorage.setItem(
                "salma_tasks",
                JSON.stringify(salma_tasks)
            );

            document.getElementById("salma_task_message").textContent =
                "Tugas berhasil disimpan!";

            salma_task_form.reset();
        });
    }

    // Form kontak melalui aplikasi email
    const salma_contact_form =
        document.getElementById("salma_contact_form");

    if (salma_contact_form) {
        salma_contact_form.addEventListener("submit", function (event) {
            event.preventDefault();

            const salma_nama =
                document.getElementById("salma_nama").value;
            const salma_email =
                document.getElementById("salma_email").value;
            const salma_subjek =
                document.getElementById("salma_subjek").value;
            const salma_pesan =
                document.getElementById("salma_pesan").value;

            const salma_body =
                "Nama: " + salma_nama +
                "\nEmail: " + salma_email +
                "\n\nPesan:\n" + salma_pesan;

            const salma_mailto =
                "mailto:edutask@example.com" +
                "?subject=" + encodeURIComponent(salma_subjek) +
                "&body=" + encodeURIComponent(salma_body);

            document.getElementById("salma_contact_message").textContent =
                "Pesan telah disiapkan. Silakan kirim melalui aplikasi email.";

            window.location.href = salma_mailto;
        });
    }

});
