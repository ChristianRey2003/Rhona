const skillsData = {
    languages: [
        { name: 'HTML5', icon: 'fab fa-html5', level: 90 },
        { name: 'CSS3', icon: 'fab fa-css3-alt', level: 85 },
        { name: 'JavaScript', icon: 'fab fa-js', level: 80 },
        { name: 'Python', icon: 'fab fa-python', level: 75 },
    ],
    tools: [
        { name: 'Git', icon: 'fab fa-git-alt', level: 80 },
        { name: 'VS Code', icon: 'fas fa-code', level: 90 },
        { name: 'Figma', icon: 'fab fa-figma', level: 75 },
        { name: 'Docker', icon: 'fab fa-docker', level: 60 }
    ],
    soft: [
        { name: 'Problem Solving', icon: 'fas fa-lightbulb', level: 85 },
        { name: 'Teamwork', icon: 'fas fa-users', level: 90 },
        { name: 'Communication', icon: 'fas fa-comments', level: 85 },
        { name: 'Time Management', icon: 'fas fa-clock', level: 80 }
    ]
};

const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkElements = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

const tabBtns = document.querySelectorAll('.tab-btn');
const skillsGrid = document.getElementById('skillsGrid');

function loadSkills(category) {
    const skills = skillsData[category];
    skillsGrid.innerHTML = '';

    skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card fade-in visible';
        skillCard.style.animationDelay = `${index * 0.1}s`;
        skillCard.innerHTML = `
            <i class="skill-icon ${skill.icon}"></i>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%;" data-level="${skill.level}"></div>
            </div>
            <p class="skill-level">${skill.level}% Proficiency</p>
        `;
        skillsGrid.appendChild(skillCard);
    });

    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.width = bar.getAttribute('data-level') + '%';
        });
    }, 100);
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadSkills(btn.getAttribute('data-tab'));
    });
});

loadSkills('languages');

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    alert(`Thank you, ${formData.name}! Your message has been sent successfully. I'll get back to you soon!`);
    contactForm.reset();
});
