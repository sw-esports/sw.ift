paragraphs = ['ff jj ff jj ff jj fj fj fj fj fj jj ff jj ff jj ff fjf fjf fjf jfj jfj jfj jfj'
, 'dd kk dd kk dd kk dk dk dk dk dk kd kd kd kd kd dkd dkd dkd dkd kdk kdk kdk kdk ddk ddk kkd kkd'
]


const left = document.querySelector('.left');
    left.innerHTML = '';
    paragraphs.forEach((paragraph, index) => {
        const paraBox = document.createElement('div');
        paraBox.classList.add('box');
        paraBox.id = index;
        paraBox.textContent = index + 1;
        left.appendChild(paraBox);
        left.classList.add('left-temp');
    });
