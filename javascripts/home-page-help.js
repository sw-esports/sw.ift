document.addEventListener('DOMContentLoaded', function() {

    const lessonBtn = document.querySelector('#lesson-btn');
    const testBtn = document.querySelector('#test-btn');

    const left = document.querySelector('.left');
    const helpBtn = document.querySelector('#help-btn');
    const settingBtn = document.querySelector('#setting-btn');
    settingBtn.addEventListener('click',()=>{
        left.innerHTML=''
        left.innerHTML=`<h1>No Customization Allow Yet </h1>`
    })
    helpBtn.addEventListener('click',()=>{
        helpBtn.classList.add('active4');
        lessonBtn.classList.remove('active1');
        testBtn.classList.remove('active2');
        left.classList.add('test-box-centre');
        left.innerHTML=''
        left.innerHTML=` <div class="help-box">
        <div class="help-upper">
            <h1>Contact Us</h1>
        </div>
        <div class="help-lower">
            <a href="https://discord.com/invite/FB5cWDBEyj"><div class="help-options discord"><div class="icon-logo"><img src="/assets/images/discord-logo.jpg" alt=""></div>Discord</div></a>
            <a href="/html/email.html"><div class="help-options email"><div class="icon-logo"><img src="/assets/images/email-logo.jpg" alt=""></div>Email</div></a>
            <a href="https://wa.me/8178589874"><div class="help-options whatsapp"><div class="icon-logo"><img src="/assets/images/whatsapp-logo.png" alt=""></div>whatsapp</div></a>
            <a href="https://www.instagram.com/red_eye_0.0/"><div class="help-options instagram"><div class="icon-logo"><img src="/assets/images/instagram-logo.jpg" alt=""></div>Instagram</div></a>
        </div>
    </div>`
    })
})