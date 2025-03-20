function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Remove the combining characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê) /ư
    return str;
}

function highlightSeat(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.trim();
    const feedback = document.getElementById('search-feedback');

    feedback.style.display = 'none';
    feedback.classList.remove('success');

    if (!searchTerm) {
        feedback.textContent = 'Vui lòng nhập số booth hoặc tên công ty.';
        feedback.style.display = 'block';
        return;
    }

    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    let found = false;

    const normalizedSearchTerm = removeVietnameseTones(searchTerm.toLowerCase());

    if (/^\d+$/.test(searchTerm)) {
        const seatId = `Booth${String(searchTerm).padStart(3, '0')}`;
        const targetSeat = document.getElementById(seatId);
        if (targetSeat) {
            targetSeat.classList.add('highlight');
            feedback.textContent = `Đã tìm thấy booth số ${searchTerm}!`;
            feedback.classList.add('success');
            feedback.style.display = 'block';
            targetSeat.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
        }
    }

    if (!found) {
        const boothElements = document.querySelectorAll('[id^="Booth"]');

        boothElements.forEach(booth => {
            const titleElement = booth.querySelector('title');
            const title = titleElement ? titleElement.textContent : null;
            if (title) {
                const normalizedTitle = removeVietnameseTones(title.toLowerCase());
                if (normalizedTitle.includes(normalizedSearchTerm)) {
                    booth.classList.add('highlight');
                    feedback.textContent = `Đã tìm thấy booth có tên chứa "${searchTerm}"!`;
                    feedback.classList.add('success');
                    feedback.style.display = 'block';
                    booth.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            }
        });
    }

    if (!found && searchTerm && !feedback.textContent) {
        feedback.textContent = `Không tìm thấy booth nào phù hợp với "${searchTerm}"!`;
        feedback.style.display = 'block';
    }
}