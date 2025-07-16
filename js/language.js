// Shared Language Toggle Functionality
const translations = {
    en: {
        // Main page translations
        projects: 'projects',
        publications: 'publications',
        bio: 'about me',
        bio_en: `<img src='assets/images/isaza_1.png' alt='Andrés Isaza' style='width:229px;float:right;margin:0 0 1.5rem 2rem;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.10);'>
        <p>Audiovisual artist, researcher and curator born in Manizales, Colombia. He graduated with honors from the Film and Television undergraduate program from the National University of Colombia in Bogota and has an MFA in Multimedia Art from the University of Lisbon. He is currently a PhD candidate at the Digital Media programe at the University of Porto. He has directed the short film Medias blancas (2017), Serene Wind (2022), and The Last Film on Earth (2023) premiered in festivals such as FICUNAM in Mexico City; FICCI in Cartagena, Colombia; Beijing International Short Film Festival; Stuttgarter Filmwinter in Germany; among others. His film work explores the relationship of time in the personal-historical-ecological world and the media itself; often bringing together a holistic view of scientific and spiritual optics.</p>
        <p>He is researcher at i2ADS, Research Institute in Art, Design and Society at the Faculty of Fine-Arts of the University of Porto, where he works in visualizing the history of cinema and the co-creation of new audiovisual archives. He was a researcher at the Interactive Technologies Institute in Portugal under the eGames Lab project, where he developed educational environmental video-games implementing language models to increase the meaningful potential of user experience.</p>
        <p>He programmed the showcase Un Mundo Sin Adultos, winner of an audiovisual curatorial grant from Idartes and exhibited at Cinemateca de Bogotá and Museo de Arte Moderno de Medellín MAMM; curated and programmes the category Film (&) Digital for the 19-20 International Image Festival in Manizales, Colombia; served as Guest Coordinator for the 19 IndiLisboa IFF; was Chief Programmer fr the 18 Equinoxio University Film Festival; and assistant programmer for the 20 International Documentary Exhibition of Bogotá MIDBO</p>
        <p>He has worked in color grading for various short-films such as Things Among Days (Mateo Vallejo, 2021), Intentos para dejarse caer (Jonas Radziunas, 2021), Los innombrables (Sara Fernández, 2018), Sin sangre (Sara Fernández and Juan Carlos Sánchez, 2016), among others. He directed several music videos for bands such as Nicolás y los Fumadores.</p>
        <p>Drop me a line: isazag [at] gmail [dot] com You may use this pronouns: (he,they/him,them)</p><span class='bio-break'></span>`,
        // Main page translations
        project1: {
            title: 'Being Water',
            meta: '2024 · interactive experience'
        },
        project2: {
            title: 'the last film on earth',
            meta: '2023 · experimental short film'
        },
        project3: {
            title: 'last_movie_on_earth_run_1',
            meta: '2022 · video installation'
        },
        project4: {
            title: 'sereno (serene wind)',
            meta: '2022 · fiction short film'
        },
        project5: {
            title: 'homo videns',
            meta: '2020 · video-essay'
        },
        project6: {
            title: 'medias blancas',
            meta: '2017 · fiction short film'
        },
        // Project detail page translations
        'the-last-film-on-earth': {
            title: 'The Last Film on Earth',
            meta: '2023 · 13 min · Spanish or English · Experimental short film',
            desc: `After the extinction of humanity, a machine relives the life of its programmer and all of its ancestors. Within seconds, it has primitive dreams of an exuberant pilgrimage for which hardly any ruins remain.`,
            credits: `<strong>Original title:</strong> La última película<br>
<strong>International title (in English):</strong> The Last Movie on Earth<br>
<strong>Country/ies:</strong> Colombia, Portugal<br>
<strong>Director:</strong> Andrés Isaza Giraldo<br>
<strong>Screenplay:</strong> Andrés Isaza Giraldo<br>
<strong>Cinematography:</strong> Mariana Santana and Thibault Solinhac<br>
<strong>Editing:</strong> Andrés Isaza Giraldo<br>
<strong>Art Direction:</strong> Andrés Azzolina, Fernando Moletta<br>
<strong>Music:</strong> Miguel Isaza<br>
<strong>Producer/s:</strong> Milagros Cabral Montijano`,
            review: `"The images that are inside the video projections were generated with the collaborative software Disco Diffusion, a modeling tool that uses brief text descriptions (prompt) and quality parameter variations to generate the requested images, giving them movement. Those instructions that Isaza gave to the machine outside the film constitute the sequentiality of the images and their existing relationships within the film. Here we find a clear use of historical reality to construct a narrative that moves backwards in linear time. For example, we see specific allusions (in order of the argument) to the golden age of cinema, the discovery of America, the great empires, prehistory, the first geological ages of the earth and what seems to be the origin of life in the universe. I consider particularly beautiful the moments in which the machine and Isaza converge to distance themselves from said historical reality and allow themselves to imagine it: being chromosome, fire, branch, flora, medicine, reflection, brightness, being water and swimming as organic complexes, sweeping, stalking, climbing, running, fleeing and sleeping. Condensing time through the relationships between images: dissolving flowers in snow, burying empires in sand, mutating dust into root, root into fire, fire into stars and stars into cave paintings. It is also interesting that these images are constructed based on particular styles, since Isaza incorporated references in the prompt such as the paintings of Giovanni Paolo Pannini, Caspar David Friedrich and Sanford Robinson Gifford, who mainly did landscape painting (something that directly proposes an experience of contemplation of space and allows us an interpretation of the historical from the visual and figurative aspect). These references we notice briefly in the span in which the camera shows the instruction screen of the previously mentioned software."<br><span style='font-style:normal; color:#b0b0b0;'>Jhonny Carvajal Orozco for <a href='https://www.losexperimentoscine.blog/2024/11/la-ultima-pelicula.html' target='_blank' style='color:#b0b0b0; text-decoration:underline;'>Los Experimentos Blog de cine</a></span>`,
            awards: [
                '2023 Ibero-American Short Film Competition - FIC.UBA (Argentina)',
                '2023 Official Selection - Festival Internacional de Medios Alternativos FICMA (México)',
                '2023 National Experimental Competition - Bogotá International Short Film Festival Bogoshorts (Colombia)',
                '2024 International Competition - Stuttgarter Filmwinter (Alemania)',
                '2024 International Competition - West Virginia Mountaineer Film Festival (Estados Unidos)',
                '2024 Porosa Animation - Porosa Animation Curatorship at Cinemateca de Bogotá',
                '2024 Official Selection - Festival Internacional de Cortometrajes Cine a la Calle, Barranquilla',
                '2024 Colombian Short Films - Bogotá International Experimental Film Festival',
                '2024 Official Selection - Narrar el Futuro: Festival de Cine & Nuevos Medios',
                '2024 Artificial Intelligence Competition - Courant3D Festiva (France)'
            ]
        },
        sereno: {
            title: 'sereno (serene wind)',
            meta: '2022 · 22 min · spanish with English subtitles · fiction shortfilm',
            desc: `1928. The thinker Fernando González and former jesuit Benjamín Correa have been walking for weeks. Completely isolated, they hike up the tropical glacier of the Nevado del Ruiz volcano where they wonder about evil and love. As Fernando gets swallowed by the wind, a magical appearance in the mountain desert connects his inner struggle to our present day.`,
            credits: `<strong>Cast:</strong> Benjamín González, Juan Lugo y Julián González<br>
<strong>Direction, screenplay, producer:</strong> Andrés Isaza Giraldo<br>
<strong>Co-producing companies:</strong> Guateque Cine, Emilia II Cine<br>
<strong>Inspired by:</strong> 'Viaje a Pie' by Fernando González<br>
<strong>Cinematography:</strong> Mauricio Reyes<br>
<strong>Costume design:</strong> Catherine Rodríguez<br>
<strong>Wardrobe and makeup:</strong> Maria Camila Castrillón<br>
<strong>Editing:</strong> Juan Carlos Sánchez<br>
<strong>Sound design:</strong> Diana Muñoz, Jose Delgadillo<br>
<strong>Music:</strong> Tania Granada, Sara Fernández<br>
<strong>Sales:</strong> Atmosfera International Sales`,
            review: `"Fernando González and Benjamín Correa cross the Nevado del Ruiz, they are two wandering walkers immersed in the immensity of a landscape that at the same time welcomes and strikes them; the inclemency of the journey gives rise to disjointed reflections, ideas come and go, they are renewed, just like the geography they travel through. Inspired by Fernando Gonzalez's Viaje a pie, Sereno bets on the representation of the sublime; the journey, although it implies movement and the constant search for paths, is at the same time an encounter with intimacy, an ascent towards abstract revelations about the demons that afflict them, atonement and love. The characters are confronted by the breathtaking nature of the paramo and the glacier, creating images that resemble the paintings of romanticism, and as a rupture mediated by the passage of thought, the modern city appears, a concrete landscape where Fernando questions the Catholic Church. Beyond the pursuit of a destination, it is the journey that becomes relevant; as the journey progresses, the narrative abandons the causal chain to propose sensorial images, where color, sound and music take center stage, as if the limits of the body were vanishing to give way to dreaming. Sereno proposes an edifying encounter with nature that notices the human being as part of it, walking it then becomes a mobilizing act of both body and thought, a stimulating journey through the evolution of unusual thoughts."<br><span style='font-style:normal; color:#b0b0b0;'>Melissa Mira, <a href='https://cinemanciafestival.com/pelicula/sereno/' target='_blank' style='color:#b0b0b0; text-decoration:underline;'>Cinemancia Film Festival</a></span>`,
            awards: [
                '2022 Official Selection - Cartagena de Indias International Film Festival FICCI (Col)',
                '2022 International Competition - Beijing International Short Film Festival (China)',
                '2022 Central Showcase - Cinemancia Metropolitan Film Festival, Medellín (Col)',
                '2022 Regional Selection - Andares Contemporary Film Festival (Peru)',
                '2022 National Selection - Cali Short Film Festival (Col)',
                '2022 Best National Short Film - Bugarte Film and Visual Arts Festival (Col)',
                '2022 Fiction Panorama - Bogotá International Short Film Festival Bogoshorts (Col)',
                '2022 National Panorama - Popayán Short Film Festival (Col)',
                '2022 International Film Fair of Manizales (Col)',
                '2022 Sobreruedas Festival, Manizales (Col)',
                '2022 Riosucio International Film Festival (Col)',
                '2023 Arrieros y Pijaos Festival, Fresno (Col)',
                '2023 International Film Festival in the Mountains, Salento (Col)',
                '2023 National Selection - Sogamoso Independent Film Festival (Col)',
                '2023 Official Selection - 17th Villa de Leyva International Film Festival (Col)',
                '2023 Special Screening - DO(C)ÔA Nature Film Festival (Portugal)',
                '2023 Cine y Encuentro, Manizales (Col)',
                '2023 El Cine Suma Paz Festival, Sumapaz (Col)',
                '2023 Sensory Cartographies Showcase, Yopal (Col)'
            ]
        }
    },
    es: {
        // Main page translations
        projects: 'proyectos',
        publications: 'publicaciones',
        bio: 'sobre mí',
        bio_es: `<img src='assets/images/isaza_1.png' alt='Andrés Isaza' style='width:229px;float:right;margin:0 0 1.5rem 2rem;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.10);'>
        <p>Artista audiovisual, investigador y curador nacido en Manizales, Colombia. Se graduó con honores de Cine y Televisión en la Universidad Nacional de Colombia — Sede Bogotá y maestría en Arte Multimedia de la Universidad de Lisboa. Actualmente cursa estudios doctorales en Digital Media en la Universidade do Porto. Ha dirigido los cortometrajes Medias blancas (2017), Sereno (2022) y La última película (2023) estrenados en festivales como FICUNAM, FICCI, Beijing International Short Film Festival, Stuttgarter Filmwinter, entre otros. Su trabajo explora la relación del tiempo en el mundo personal-histórico-ecológico y el propio medio; trayendo una mirada holística con ópticas científicas y místicas.</p>
        <p>Es investigador en i2ADS, Instituto de Investigação em Arte, Design e Sociedade de la Faculadade de Belas-Artes de la Universidade do Porto, donde trabaja con visualización de la historia del cine y co-creación de nuevos archivos cinematográficos. Fue investigador en el Interactive Technologies Institute bajo el projecto eGames Lab, donde desarrolló videojuegos educativos alrededor de temas medioambientales incorporando modelos de lenguaje para aumentar el impacto significativo de las experiencias.</p>
        <p>Programó la curaduría Un Mundo Sin Adultos ganadora de la Beca de Curaduría Audiovisual Idartes y exhibida en la Cinemateca de Bogotá y el Museo de Arte de Medellín MAMM. Fue curador de la categoría Cine (y) Digital del 19-20 Festival Internacional de la Imagen, coordinador de invitados para el 19 IndieLisboa IFF, Jefe de Programación del 18 Festival Equinoxio y asistente de la programación de la Muestra Internacional Documental de Bogotá 20 MIDBO.</p>
        <p>También ha hecho corrección de color para varios cortometrajes como Antes de las cosas (Mateo Vallejo, 2021), Intentos para dejarse caer (Jonas Radziunas, 2021), Los innombrables (Sara Fernández, 2018), Sin sangre (Sara Fernández y Juan Carlos Sánchez, 2016), entre otros. Realizó videos musicales para bandas como Nicolás y los Fumadores, Andrés Gualdrón (Animal Blanco) y Bliss.</p>
        <p>Déjame un mensaje en: isazag [arroba] gmail [punto] com Usa estos pronombres: (él,elle)</p><span class='bio-break'></span>`,
        project1: {
            title: 'Being Water',
            meta: '2024 · experiencia interactiva'
        },
        project2: {
            title: 'La última película',
            meta: '2023 · cortometraje experimental'
        },
        project3: {
            title: 'last_movie_on_earth_run_1',
            meta: '2022 · instalación de video'
        },
        project4: {
            title: 'Sereno',
            meta: '2022 · cortometraje de ficción'
        },
        project5: {
            title: 'homo videns',
            meta: '2020 · video-ensayo'
        },
        project6: {
            title: 'medias blancas',
            meta: '2017 · cortometraje de ficción'
        },
        // Project detail page translations
        'the-last-film-on-earth': {
            title: 'La última película',
            meta: '2023 · 13 min · Español o Inglés · Cortometraje experimental',
            desc: `Tras la extinción de la humanidad, una máquina revive la vida de su programador y de todos sus antepasados. En cuestión de segundos, tiene sueños primitivos de una exuberante peregrinación de la que apenas quedan ruinas.`,
            credits: `<strong>Título original:</strong> La última película<br>
<strong>Título internacional (en inglés):</strong> The Last Movie on Earth<br>
<strong>País/es:</strong> Colombia, Portugal<br>
<strong>Director:</strong> Andrés Isaza Giraldo<br>
<strong>Guión:</strong> Andrés Isaza Giraldo<br>
<strong>Fotografía:</strong> Mariana Santana y Thibault Solinhac<br>
<strong>Edición:</strong> Andrés Isaza Giraldo<br>
<strong>Dirección de Arte:</strong> Andrés Azzolina, Fernando Moletta<br>
<strong>Música:</strong> Miguel Isaza<br>
<strong>Productor/es:</strong> Milagros Cabral Montijano`,
            review: `"Las imágenes que están dentro de las videoproyecciones fueron generadas con el software colaborativo Disco Diffusion, una herramienta modeladora que utiliza breves descripciones de texto (prompt) y variaciones de parámetros de calidad para generar las imágenes solicitadas, otorgándoles movimiento. Aquellas instrucciones que Isaza dio a la máquina fuera de la película conforman la secuencialidad de las imágenes y sus relaciones existentes dentro de la película. Aquí encontramos un claro uso de la realidad histórica para construir un relato que se desplaza hacia atrás en el tiempo lineal. Por ejemplo, vemos alusiones específicas (en orden del argumento) a la edad dorada del cine, el descubrimiento de América, los grandes imperios, la prehistoria, las primeras edades geológicas de la tierra y lo que parece ser el origen de la vida en el universo. Considero particularmente bellos los momentos en los que la máquina e Isaza confluyen para distanciarse de dicha realidad histórica y se permiten imaginarla: ser cromosoma, fuego, rama, flora, medicina, reflejo, brillo, ser agua y nadar como complejos orgánicos, barrer, acechar, trepar, correr, huir y dormir. Condensar el tiempo a través de las relaciones entre las imágenes: disolver las flores en la nieve, enterrar los imperios en la arena, mutar el polvo en raíz, la raíz en fuego, el fuego en estrellas y las estrellas en pinturas rupestres. También es interesante que dichas imágenes están construidas con base en estilos particulares, pues Isaza incorporó referentes en el prompt como las pinturas de Giovanni Paolo Pannini, Caspar David Friedrich y Sanford Robinson Gifford, quienes hicieron principalmente pintura de paisaje (algo que propone directamente una experiencia de contemplación del espacio y nos permite una interpretación de lo histórico desde el aspecto visual y figurativo). Estos referentes los notamos brevemente en el lapso en que la cámara muestra la pantalla de instrucciones del software previamente mencionado."<br><span style='font-style:normal; color:#b0b0b0;'>Jhonny Carvajal Orozco para <a href='https://www.losexperimentoscine.blog/2024/11/la-ultima-pelicula.html' target='_blank' style='color:#b0b0b0; text-decoration:underline;'>Los Experimentos Blog de cine</a></span>`,
            awards: [
                '2023 Competencia de Cortometraje Iberoamericanos en FIC.UBA (Argentina)',
                '2023 Festival Internacional de Medios Alternativos FICMA (México)',
                '2023 Competencia Nacional Experimental - Bogotá International Short Film Festival Bogoshorts (Colombia)',
                '2024 Competencia Internacional - Stuttgarter Filmwinter (Alemania)',
                '2024 Competencia Internacional - West Virginia Mountaineer Film Festival (Estados Unidos)',
                '2024 Porosa animación - Curaduría de Porosa Animación en Cinemateca de Bogotá',
                '2024 Selección Oficial - Festival Internacional de Cortometrajes Cine a la Calle, Barranquilla',
                '2024 Cortometrajes Colombia- Bogotá International Experimental Film Festival',
                '2024 Selección Oficial - Narrar el Futuro: Festival de Cine & Nuevos Medios',
                '2024 Artificial Intelligence Competition - Courant3D Festiva (France)'
            ]
        },
        sereno: {
            title: 'sereno (serene wind)',
            meta: '2022 · 22 min · español · cortometraje de ficción',
            desc: `1928. El pensador Fernando González y el ex-jesuita don Benjamín Correa han caminado por semanas y ahora ascienden al Volcán Nevado del Ruiz. Finalmente respiran mientras se preguntan por el amor. Fernando es consumido por el viento y una aparición mágica en el desierto conecta su lucha interna con las de nuestros días y las de todos los tiempos.`,
            credits: `<strong>Elenco:</strong> Benjamín González, Juan Lugo y Julián González<br>
<strong>Dirección, guion, producción:</strong> Andrés Isaza Giraldo<br>
<strong>Coproducción:</strong> Guateque Cine, Emilia II Cine<br>
<strong>Inspirado en:</strong> 'Viaje a Pie' de Fernando González<br>
<strong>Fotografía:</strong> Mauricio Reyes<br>
<strong>Diseño de vestuario:</strong> Catherine Rodríguez<br>
<strong>Vestuario y maquillaje:</strong> Maria Camila Castrillón<br>
<strong>Montaje:</strong> Juan Carlos Sánchez<br>
<strong>Diseño sonoro:</strong> Diana Muñoz, Jose Delgadillo<br>
<strong>Música:</strong> Tania Granada, Sara Fernández<br>
<strong>Ventas:</strong> Atmosfera International Sales`,
            review: `"Fernando González y Benjamín Correa atraviesan el Nevado del Ruiz, son dos caminantes errantes sumidos en la inmensidad de un paisaje que al mismo tiempo los acoge y los golpea; las inclemencias del trayecto suscitan reflexiones desarticuladas, las ideas van y vienen, se renuevan, al igual que la geografía que recorren. Inspirado en la obra Viaje a pie de Fernando González, Sereno le apuesta a la representación de lo sublime; el viaje, si bien implica el movimiento y la búsqueda constante de caminos, es a su vez un encuentro con la intimidad, un ascenso hacia revelaciones abstractas sobre los demonios que los aquejan, la expiación y el amor. Los personajes son confrontados por la imponente naturaleza del páramo y el glaciar, creando imágenes que se asemejan a la pintura del romanticismo, y como una ruptura mediada por el trasegar del pensamiento, aparece la ciudad actual, un paisaje de cemento en donde Fernando cuestiona a la iglesia católica. Más allá de la persecución de un destino, es el trayecto el que cobra relevancia; a medida que avanza el viaje, la narrativa va abandonando la cadena causal para proponer imágenes sensoriales, en donde el color, el sonido y la música cobran protagonismo, como si los límites del cuerpo se fueran esfumando para dar lugar a la ensoñación. Sereno propone un encuentro edificante con la naturaleza que advierte al ser humano como parte de ella, caminarla se vuelve entonces un acto movilizador tanto del cuerpo como del pensamiento, un viaje estimulante por el devenir de los pensamientos inusitados."<br><span style='font-style:normal; color:#b0b0b0;'>Melissa Mira, <a href='https://cinemanciafestival.com/pelicula/sereno/' target='_blank' style='color:#b0b0b0; text-decoration:underline;'>Cinemancia Film Festival</a></span>`,
            awards: [
                '2022 Selección Oficial - Festival Internacional de Cine de Cartagena de Indias FICCI (Col)',
                '2022 Competencia Internacional - Beijing International Short Film Festival (China)',
                '2022 Muestra Central - Cinemancia Metropolitan Film Festival, Medellín (Col)',
                '2022 Selección Regional - Andares Contemporary Film Festival (Perú)',
                '2022 Selección Nacional - Cali Short Film Festival (Col)',
                '2022 Mejor Cortometraje Nacional - Bugarte Film and Visual Arts Festival (Col)',
                '2022 Panorama de Ficción - Bogotá International Short Film Festival Bogoshorts (Col)',
                '2022 Panorama Nacional - Popayán Short Film Festival (Col)',
                '2022 Feria Internacional de Cine de Manizales (Col)',
                '2022 Sobreruedas Festival, Manizales (Col)',
                '2022 Festival Internacional de Cine de Riosucio (Col)',
                '2023 Festival Arrieros y Pijaos, Fresno (Col)',
                '2023 International Film Festival in the Mountains, Salento (Col)',
                '2023 Selección Nacional - Sogamoso Independent Film Festival (Col)',
                '2023 Selección Oficial - 17th Villa de Leyva International Film Festival (Col)',
                '2023 Proyección Especial - DO(C)ÔA Nature Film Festival (Portugal)',
                '2023 Cine y Encuentro, Manizales (Col)',
                '2023 El Cine Suma Paz Festival, Sumapaz (Col)',
                '2023 Sensory Cartographies Showcase, Yopal (Col)'
            ]
        },
        'homo-videns': {
            title: 'homo videns',
            meta: '2020 · 8\' · español · video-ensayo',
            desc: `En la obra de Luis Ospina, hay una corriente subterránea que la sostiene y le da su particular coherencia, lucidez y rigor: la autoconciencia sobre su medio de expresión. Siendo muy niño, el padre de Ospina le entregó al futuro director una cámara: «ahora le toca [filmar] a usted». Ese niño que «simplemente observaba» la realidad, según dice Ospina de sí mismo, no solo va a poblar sus películas de aparatos de registro y captura del sonido y la imagen, y de pantallas de todo tipo. Se sirve de esa tecnología para hacer un comentario -escéptico, irónico- sobre una sociedad que él, desde muy temprano, intuyó que era una sociedad teledirigida, de miedos acrecentados por los medios: un estado de cosas que solo un aparato crítico, como el que intentó y al que le dio forma, podría desactivar.`,
            credits: `<strong>Co-dirigido con:</strong> Pedro Adrián Zuluaga`,
            awards: [
                'Video encargado para la exposición "Luis Ospina: el corolario es casi inevitable, 1970-2019" en Fundación Gilberto Alzate Avendaño'
            ]
        }
    }
};

// Utility to get project key from URL (e.g., lorem-film.html -> 'sereno' or use filename without extension)
function getProjectKeyFromURL() {
    // Example: /projects/lorem-film.html -> 'lorem-film'
    const match = window.location.pathname.match(/\/projects\/([\w-]+)\.html$/);
    if (match) {
        // Map filename to translation key if needed
        if (match[1] === 'lorem-film') return 'sereno';
        if (match[1] === 'the-last-film-on-earth') return 'the-last-film-on-earth';
        if (match[1] === 'homo_videns') return 'homo-videns';
        // Add more mappings as needed
        return match[1];
    }
    return null;
}

// Set initial language on page load
function setInitialLanguage(lang) {
    console.log('setInitialLanguage called with:', lang);
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    if (window.location.pathname.includes('projects/')) {
        console.log('Applying language to project page:', lang);
        const projectKey = getProjectKeyFromURL();
        if (projectKey) {
            setProjectLanguage(lang, projectKey);
        } else {
            setProjectLanguage(lang, 'sereno'); // fallback
        }
    } else {
        console.log('Applying language to main page:', lang);
        setLanguage(lang);
    }
}

// Main page language switching
function setLanguage(lang) {
    console.log('setLanguage called with:', lang);
    // Section nav
    const sectionBtns = document.querySelectorAll('.section-btn');
    if (sectionBtns.length >= 3) {
        sectionBtns[0].textContent = translations[lang].projects;
        sectionBtns[1].textContent = translations[lang].publications;
        sectionBtns[2].textContent = translations[lang].bio;
    }
    
    // Projects
    const projectItems = document.querySelectorAll('.project-item');
    for (let i = 0; i < projectItems.length; i++) {
        const translation = translations[lang][`project${i+1}`];
        if (translation) {
            projectItems[i].querySelector('h3').textContent = translation.title;
            projectItems[i].querySelector('.project-meta').textContent = translation.meta;
        }
    }
    console.log('setLanguage completed');
}

// Project detail page language switching
function setProjectLanguage(lang, projectKey) {
    console.log('setProjectLanguage called with:', lang, projectKey);
    const projectData = translations[lang][projectKey];
    if (!projectData) {
        console.error('No project data found for:', lang, projectKey);
        return;
    }
    
    const titleEl = document.querySelector('.project-detail-title');
    const metaEl = document.querySelector('.project-detail-meta');
    const descEl = document.querySelector('.project-detail-desc');
    const creditsEl = document.querySelector('.project-credits');
    const reviewEl = document.querySelector('.project-review');
    const awardsEl = document.querySelector('.project-awards ul');
    
    if (titleEl) titleEl.textContent = projectData.title;
    if (metaEl) metaEl.textContent = projectData.meta;
    if (descEl) descEl.textContent = projectData.desc;
    if (creditsEl) creditsEl.innerHTML = projectData.credits;
    if (reviewEl) reviewEl.innerHTML = projectData.review;
    
    if (awardsEl && projectData.awards) {
        awardsEl.innerHTML = '';
        projectData.awards.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            awardsEl.appendChild(li);
        });
    }
    // Show/hide trailers based on language
    document.querySelectorAll('.project-detail-media.video-en').forEach(el => {
        el.style.display = (lang === 'en') ? '' : 'none';
    });
    document.querySelectorAll('.project-detail-media.video-es').forEach(el => {
        el.style.display = (lang === 'es') ? '' : 'none';
    });
    console.log('setProjectLanguage completed');
} 

// Initialize language system
function initializeLanguage() {
    console.log('initializeLanguage called');
    const langButtons = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    console.log('Saved language from localStorage:', savedLang);
    setInitialLanguage(savedLang);
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            localStorage.setItem('selectedLanguage', lang);
            console.log('Saved to localStorage:', lang);
            if (window.location.pathname.includes('projects/')) {
                const projectKey = getProjectKeyFromURL();
                if (projectKey) {
                    setProjectLanguage(lang, projectKey);
                } else {
                    setProjectLanguage(lang, 'sereno'); // fallback
                }
            } else {
                setLanguage(lang);
            }
        });
    });
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - language.js');
    initializeLanguage();
});

// Fallback: if DOMContentLoaded has already fired, run immediately
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
    console.log('DOM still loading, waiting for DOMContentLoaded');
} else {
    // DOM is already loaded, run immediately
    console.log('DOM already loaded, running initialization immediately');
    initializeLanguage();
}

// Additional fallback: run after a short delay to ensure all elements are present
setTimeout(function() {
    console.log('Running delayed initialization');
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    if (window.location.pathname.includes('projects/')) {
        console.log('Applying delayed language to project page:', savedLang);
        const projectKey = getProjectKeyFromURL();
        if (projectKey) {
            setProjectLanguage(savedLang, projectKey);
        } else {
            setProjectLanguage(savedLang, 'sereno'); // fallback
        }
    }
}, 100);

// More aggressive fallback for project pages
setTimeout(function() {
    console.log('Running aggressive fallback for project page');
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    if (window.location.pathname.includes('projects/')) {
        console.log('Applying aggressive language to project page:', savedLang);
        const projectKey = getProjectKeyFromURL();
        if (projectKey) {
            setProjectLanguage(savedLang, projectKey);
        } else {
            setProjectLanguage(savedLang, 'sereno'); // fallback
        }
        
        // Also update button states
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === savedLang) {
                btn.classList.add('active');
            }
        });
    }
}, 500);

// Final fallback - wait for window load
window.addEventListener('load', function() {
    console.log('Window load event - applying language');
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    if (window.location.pathname.includes('projects/')) {
        console.log('Applying language on window load to project page:', savedLang);
        const projectKey = getProjectKeyFromURL();
        if (projectKey) {
            setProjectLanguage(savedLang, projectKey);
        } else {
            setProjectLanguage(savedLang, 'sereno'); // fallback
        }
        
        // Update button states
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === savedLang) {
                btn.classList.add('active');
            }
        });
    }
}); 