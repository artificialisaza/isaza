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
            title: 'santas postales',
            meta: '2021 · collectable cards'
        },
        project6: {
            title: 'homo videns',
            meta: '2020 · video-essay'
        },
        project7: {
            title: 'medias blancas',
            meta: '2017 · fiction short film'
        },
        project8: {
            title: 'Bailando triste',
            meta: '2018 · music video'
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
        },
        'homo-videns': {
            title: 'homo videns',
            meta: '2020 · 8\' · español · video-ensayo',
            desc: `En la obra de Luis Ospina, hay una corriente subterránea que la sostiene y le da su particular coherencia, lucidez y rigor: la autoconciencia sobre su medio de expresión. Siendo muy niño, el padre de Ospina le entregó al futuro director una cámara: «ahora le toca [filmar] a usted». Ese niño que «simplemente observaba» la realidad, según dice Ospina de sí mismo, no solo va a poblar sus películas de aparatos de registro y captura del sonido y la imagen, y de pantallas de todo tipo. Se sirve de esa tecnología para hacer un comentario -escéptico, irónico- sobre una sociedad que él, desde muy temprano, intuyó que era una sociedad teledirigida, de miedos acrecentados por los medios: un estado de cosas que solo un aparato crítico, como el que intentó y al que le dio forma, podría desactivar.`,
            credits: `<strong>Co-dirigido con:</strong> Pedro Adrián Zuluaga`,
            awards: [
                'Video encargado para la exposición "Luis Ospina: el corolario es casi inevitable, 1970-2019" en Fundación Gilberto Alzate Avendaño'
            ]
        },
       
        "pub1.abstract": "Energy Communities (ECs) are confronted by diverse and intricate challenges concerning sustainability development goals and climate change awareness. This demonstration introduces En-join, a speculative game that addresses these complexities by using Large Language Models (LLMs) to engage players in negotiating solutions for such challenges. En-join demonstrates a novel approach by integrating an LLM as a dual-agent, serving simultaneously as a narrative guide and evaluator, to simulate EC dynamics. Players interact with LLM-powered Non-Player Characters (NPCs) to navigate open-ended scenarios, promoting reflection on sustainability and community participatory decisions on their own resources, alongside pro-social behaviors. This work highlights the potential of LLMs as mediators in serious games, fostering engagement and critical thinking on sustainable energy practices.",
        "pub2.abstract": "Between anecdote, correspondence, and reflection, the journey of a project among friends. In 2018, we curated the audiovisual program Un mundo sin adultos with the idea of asking what the absence of adults mobilized in our ways of watching films. The curation became a school and helped us follow the clues of intuitions and connections among a corpus of diverse films, each of which offers a different answer to the denial of the adult. The films are presented here in three thematic lines: play, chaos, and discovery. We also imagine new paths for Colombian cinema, of which we have been a part by staging an encounter. We question the ideas of cinematic fathers that still persist in contemporary cinema and claim doing together as friends in a loving and political way.",
        "pub3.abstract": "Energy communities are emerging frameworks where citizens collectively share renewable energy. Levering knowledge about this topic is challenging for how varied these types of communities might be and how many actors are involved in decision taking. We are developing En-join, a game in which the player has to solve open-ended challenges that are mediated and evaluated by conversational agents that represent members of an energy community. We implemented and prompted an LLM (Phi-4) to perform role-playing and evaluation simultaneously. We tested prompt variants indicating personality and behavior and meta-evaluated the evaluation performance using six predefined answers across three levels. Our results suggest that indicating social preferences noticeably affects the evaluation behavior. We contribute to the field of games and serious games by showing how LLMs can be used as conversational characters and evaluator agents simultaneously, and suggest that role-playing might be affecting evaluation behavior in any LLM implementations.",
        "pub4.abstract": "The evaluation of open-ended responses in serious games presents a unique challenge, as correctness is often subjective. Large Language Models (LLMs) are increasingly being explored as evaluators in such contexts, yet their accuracy and consistency remain uncertain, particularly for smaller models intended for local execution. This study investigates the reliability of five small-scale LLMs when assessing player responses in En-join, a game that simulates decision-making within energy communities. By leveraging traditional binary classification metrics (including accuracy, true positive rate, and true negative rate), we systematically compare these models across different evaluation scenarios. Our results highlight the strengths and limitations of each model, revealing trade-offs between sensitivity, specificity, and overall performance. We demonstrate that while some models excel at identifying correct responses, others struggle with false positives or inconsistent evaluations. The findings highlight the need for context-aware evaluation frameworks and careful model selection when deploying LLMs as evaluators. This work contributes to the broader discourse on the trustworthiness of AI-driven assessment tools, offering insights into how different LLM architectures handle subjective evaluation tasks.",
        "pub5.abstract": "Being Water is an IDN experience that speculates about the ways of being of water in the world. It combines 360° video, artifact-beings, voice-over and atmospheric sound. In a first iteration, users navigate through the environment to listen to authorial text. This paper's focus is on second iteration in which we experiment with integrating generative AI (genAI) to various degrees (e.g., augmenting interaction, making it replayable, sustaining a narrative) by using authorial text and scene context. We discuss preliminary findings in using LLMs as a collaborator to make meaningful additions to digital artworks.",
        "pub6.abstract": "This work seeks to understand the physical and metaphysical dimensions of rivers and how they can be expressed as a cinematographic process. It proposes a film that is analogous to the river in its form, volume and time, through different ontological and artistic perspectives. Three main questions are addressed: how to film the rivers of the future, how to make a mirror film and how to film from the visual cortex. Although these questions may seem impossible to answer in a practical way, possible approaches are speculated, both philosophical, artistic and scientific.<br><br>The figure of Narcissus in contemporary art reveals an obsession with creation and the media itself. In addition, Narcissus is interpreted as a representation of contemporary social illness, because technical modernity has left human latency dormant in us. The work draws on the philosophy and mythology of various native peoples, especially in the Amazon River basin, who describe the practices of dreaming and connecting with the spirit world. A cure for modern dormancy is proposed through a reflective film that invites the viewer to experience the flow of Narcissus and his metamorphosis into a river.<br><br>After reviewing rivers, mirrors and the visual cortex from a reductionist perspective, a unity of concepts in the cranial box is proposed in a scientific-poetic speculation. In the mid of these digressions are the artist's dreams and his subjective perception of the natural and artificial world, as well as the technical decisions that thought forces in the construction of a river-mirror-cortex film, which include 360º camera footage and machine learning algorithms. Instead of arriving at concrete elaborations, the essay proposes the liberation of the symbolic state of art and the free formation of art both in the object and in the viewer. In the end, all that remains is silence.",
        "pub7.abstract": "Building on previous work on incorporating large language models (LLM) in gaming, we investigate the possibility of implementing LLM as evaluating agents of open-ended challenges in serious games and its potential to facilitate a meaningful experience for the player. We contribute with a sustainability game prototype in a single natural language prompt about energy communities and we tested it with 13 participants inside ChatGPT-3.5. Two participants were already aware of energy communities before the game, and eight of the remaining 11 gained valuable knowledge about the specific topic. Comparing ChatGPT-3.5 evaluations of players’ interaction with an expert’s assessment, ChatGPT-3.5 correctly evaluated 81% of player’s answers. Our results are encouraging and show the potential of using LLMs as mediating agents in educational games, while also allowing easy prototyping of games through natural language prompts.",
        "pub8.abstract": "This paper proposes a methodology for visualizing satellite-based machine learning (ML) datasets to understand the visual components that will be used as inputs for developing ML models. The proposed methodology uses t-Distributed Stochastic Neighbor Embedding (T-SNE) methods to create visualizations of satellite images leveraging models that were pre-trained in ImageNet. T-SNE is a self-supervised learning tool used to transform high-dimensional spaces into two- or three-dimension embeddings, making it easier to visualize a broad dataset in a single image or space. The methodology is demonstrated using the LUCAS Topsoil Analysis dataset with satellite images from Sentinel-2. The dataset was constructed using the TerraSense Toolkit (TSTK). The T-SNE visualization tool aims to improve ML research by providing a clearer visual understanding of satellite-based datasets.",
        "pub9.abstract": "I could not say for sure who is speaking now, whether it is you Lucas, whether it is Fernando or whether it is me. If I could not convince you of that, we will talk next about a novel. But that would not be a certain purpose, since my aim is to convince us that My Simón Bolívar (González, 2015) is, despite and thanks to its levels of fiction, an essay.<br><br>My Simón Bolívar (2015) is, as seems evident, a book about Simón Bolívar. Or, rather, a book that precedes the biography of Simón Bolívar, since the biography would be the second volume. If that volume had been finished, it would have been called El Libertador and would contain a greatness the size of South America. The first volume, published in 1930, is a meditation that could be equivalent to Simón Bolívar in Jamaica or to the last days of Jesus in the desert (González, 2015): meditations prior to a great vital work.<br><br>Lucas Ochoa is a man of method and this is evidenced by the fact that at the age of eight he wrote his first psychological essay on Pain (González, 2015). To write My Simón Bolívar he used a method he called the emotional method. Ochoa set out, in flesh and spirit, to relive Bolívar, to live him in himself and to let Bolívar live in him without losing \"sight that the universe is the object and that we must not be possessed\" (González, 2015, p. 3). This method could be just that, to relive Bolívar — hence the title carries the possessive my—, but it seems to be a more complex process than the book could glimpse and which aims to make inseparable the present substance of Ochoa from the historical substance of Bolívar and, in turn, from the substance of Fernando González, the author of this book. How does one live with a great hero inside, with a consciousness the size of South America as Bolívar had? What prudence and with what regime must one submit to meditate on the profound crisis that were his glorious days?",
        "pub10.abstract": "“La elevación paramuna” is a critical and poetic essay that draws an alternative map of the filmic landscape of the Andean páramo, especially in Colombia. Andrés Isaza explores how this ecosystem has been represented in cinema over time, from the first records of the mid-20th century to contemporary productions. Through examples such as El páramo de Cumanday, Siete cabezas, Nuestra voz de tierra, memoria y futuro and El valle sin sombras, the author analyzes the symbolic, ecological, spiritual and political dimension of the páramo in cinema. The text questions the visual hegemony of the global north and proposes a cartographic critique centered on the local, incorporating elements of geography, natural history, indigenous thought and collective memory. The essay thus becomes an invitation to see and think of the páramo not only as a natural setting, but as a territory of resistance, transformation and deep human sensitivity.",
        "pub11.abstract": "Indigenous worldviews place humans as deeply interconnected to nature. However, digital materials often limit the production of non human-centric experiences. Building on work that places perspectivism as a core tenet for artistic creation, we explore thinking from the perspective of water in the creation Being Water, an interactive experience representative of confluence of different digital media. This collaboration demonstrates how digital media can simulate and express the agency of non-human entities, challenging human-centric design paradigms. The project incorporates diverse artistic approaches, such as immersive video capturing by rivers and seas, poetic narratives inspired by the water cycle, and AI-generated visuals. Supporting and incorporating Large Language Models in the creative process, we reflect on the role of machines as tools for perspectivism while highlighting the limitations of current AI systems in representing other ontological perspectives.",
        "pub12.abstract": "This research explores the significance of visual elements, specifically graphics and illustrations, in serious games designed for educational purposes, targeting teenagers. The paper focuses on the applicability of design elements to enhance engagement in a game currently in development that educates about energy communities. The game, EN-JOIN, uses a text-based interface where players interact by typing answers, which are evaluated by a Large Language Model (LLM). This interactive \"conversation\" guides players through various levels, contributing to the storyline and educational objectives. Our approach incorporates inclusive design, emphasizing the portrayal of diverse cultures, genders, and identities. By leveraging simplified, symbolic visuals, we aim to create an engaging and empathetic experience without overwhelming players. This study addresses the challenges of balancing complexity and simplicity in visual design, ensuring that characters and scenarios are relatable yet free from stereotypes. The game aims to make players aware of their environmental impact and encourages them to engage with sustainable energy practices."

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
            title: 'santas postales',
            meta: '2021 · tarjetas coleccionables'
        },
        project6: {
            title: 'homo videns',
            meta: '2020 · video-ensayo'
        },
        project7: {
            title: 'medias blancas',
            meta: '2017 · cortometraje de ficción'
        },
        project8: {
            title: 'Bailando triste',
            meta: '2018 · videoclip'
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
        },
        
        "pub1.abstract": "Las comunidades energéticas (CE) se enfrentan a retos diversos y complejos relacionados con los objetivos de desarrollo sostenible y la concienciación sobre el cambio climático. Esta demostración presenta En-join, un juego especulativo que aborda estas complejidades utilizando modelos de lenguaje grandes (LLM) para involucrar a los jugadores en la negociación de soluciones a dichos retos. En-join muestra un enfoque novedoso al integrar un LLM como agente dual, que actúa simultáneamente como guía narrativo y evaluador, para simular la dinámica de las CE. Los jugadores interactúan con personajes no jugadores (NPC) impulsados por LLM para navegar por escenarios abiertos, lo que fomenta la reflexión sobre la sostenibilidad y las decisiones participativas de la comunidad sobre sus propios recursos, junto con comportamientos prosociales. Este trabajo destaca el potencial de los LLM como mediadores en juegos serios, fomentando el compromiso y el pensamiento crítico sobre las prácticas energéticas sostenibles.",
        "pub2.abstract": "Entre la anécdota, la correspondencia y la reflexión, el recorrido de un proyecto entre amigos. En 2018, realizamos la curaduría audiovisual Un mundo sin adultos con la idea de preguntar qué movilizaba la ausencia de adultos en nuestras formas de ver cine. La curaduría se transformó en una escuela y nos ayudó a seguir las pistas de intuiciones y conexiones entre un corpus de películas diversas, cada una de las cuales ofrece una respuesta diferente a la negación del adulto. Las películas son presentadas aquí en tres líneas temáticas: juego, caos y descubrimiento. Imaginamos también nuevos caminos para el cine colombiano, del cual hemos hecho parte con la puesta en escena de un encuentro. Nos cuestionamos las ideas de los padres cinematográficos que perviven aún en el cine contemporáneo y reclamamos el hacer juntos como amigos de forma cariñosa y política.",
        "pub3.abstract": "Las comunidades energéticas son marcos emergentes en los que los ciudadanos comparten colectivamente energías renovables. Aprovechar el conocimiento sobre este tema es un reto, dada la gran variedad de comunidades de este tipo que pueden existir y el gran número de actores que participan en la toma de decisiones. Estamos desarrollando En-join, un juego en el que el jugador tiene que resolver retos abiertos que son mediados y evaluados por agentes conversacionales que representan a los miembros de una comunidad energética. Implementamos e hicimos prompt de un LLM (Phi-4) para realizar simultáneamente el juego de roles y la evaluación. Probamos variantes de prompt que indican la personalidad y el comportamiento y metaevaluamos eldesempeño de la evaluación utilizando seis respuestas predefinidas en tres niveles. Nuestros resultados sugieren que indicar las preferencias sociales afecta notablemente al comportamiento de la evaluación. Contribuimos al campo de los juegos y los juegos serios mostrando cómo los LLM pueden utilizarse simultáneamente como personajes conversacionales y agentes evaluadores, y sugerimos que el juego de roles podría estar afectando al comportamiento de evaluación en cualquier implementación de LLM.",
        "pub4.abstract": "La evaluación de respuestas abiertas en juegos serios presenta un reto único, ya que la corrección suele ser subjetiva. Los modelos de lenguaje grandes (LLM) se están explorando cada vez más como evaluadores en estos contextos, pero su precisión y consistencia siguen siendo inciertas, especialmente en el caso de los modelos más pequeños destinados a la ejecución local. Este estudio investiga la fiabilidad de cinco LLM a pequeña escala a la hora de evaluar las respuestas de los jugadores en En-join, un juego que simula la toma de decisiones dentro de las comunidades energéticas. Aprovechando las métricas tradicionales de clasificación binaria (incluida la precisión, la tasa de verdaderos positivos y la tasa de verdaderos negativos), comparamos sistemáticamente estos modelos en diferentes escenarios de evaluación. Nuestros resultados destacan las fortalezas y limitaciones de cada modelo, revelando las compensaciones entre la sensibilidad, la especificidad y el rendimiento general. Demostramos que, mientras que algunos modelos destacan en la identificación de respuestas correctas, otros tienen dificultades con los falsos positivos o las evaluaciones inconsistentes. Los resultados ponen de relieve la necesidad de marcos de evaluación sensibles al contexto y una selección cuidadosa de los modelos a la hora de implementar LLM como evaluadores. Este trabajo contribuye al debate más amplio sobre la fiabilidad de las herramientas de evaluación basadas en la IA, ofreciendo información sobre cómo las diferentes arquitecturas de LLM manejan las tareas de evaluación subjetiva.",
        "pub5.abstract": "Being Water es una experiencia de story-telling digital interactivo (IDN) que especula sobre las formas de ser del agua en el mundo. Combina video de 360°, seres-artefactos, voz en off y sonido atmosférico. En una primera iteración, los usuarios navegan por el entorno para escuchar el texto del autor. Este artículo se centra en la segunda iteración, en la que experimentamos con la integración de la IA generativa (genAI) en diversos grados (por ejemplo, aumentando la interacción, haciendo que sea reproducible, manteniendo una narrativa) mediante el uso del texto del autor y el contexto de la escena. Discutimos los resultados preliminares del uso de LLM como colaborador para realizar adiciones significativas a obras de arte digitales.",
        "pub6.abstract": "Este trabajo trata de comprender las dimensiones físicas y metafísicas de los ríos y cómo pueden expresarse como proceso cinematográfico. Propone una película análoga al río en su forma, volumen y tiempo, a través de diferentes perspectivas ontológicas y artísticas. Se abordan tres cuestiones principales: cómo filmar los ríos del futuro, cómo hacer una película espejo y cómo filmar desde la corteza visual. Aunque estas preguntas puedan parecer imposibles de responder de forma práctica, se exploran posibles enfoques filosóficos, artísticos y científicos.\n\nLa figura de Narciso en el arte contemporáneo revela una obsesión por la creación y los propios medios de comunicación. Además, Narciso se interpreta como una representación de la enfermedad social contemporánea, pues la modernidad técnica haya dejado latente en nosotros la latencia humana. La obra se inspira en la filosofía y mitología de varios pueblos originarios, especialmente de la cuenca del río Amazonas, que describen las prácticas de soñar y conectar con el mundo espiritual. Se propone una cura para el adormecimiento moderno a través de una película reflexiva que invita al espectador a experimentar el fluir de Narciso y su metamorfosis en río.\n\nTras revisar los ríos, los espejos y la corteza visual desde una perspectiva reduccionista, se propone una unidad de conceptos en la caja craneal en una especulación científico-poética. En medio de estas digresiones se encuentran los sueños del artista y su percepción subjetiva del mundo natural y artificial, así como las decisiones técnicas a las que obliga el pensamiento en la construcción de una película río-espejo-córtex, que incluyen tomas de cámara en 360º y algoritmos de aprendizaje de máquina. En lugar de llegar a elaboraciones concretas, el ensayo propone la liberación del estado simbólico del arte y la libre formación del arte tanto en el objeto como en el espectador. Al final, solo queda silencio.",
        "pub7.abstract": "Basándonos en trabajos anteriores sobre la incorporación de modelos de lenguaje grandes (LLM) en los videojuegos, investigamos la posibilidad de implementar LLM como agentes evaluadores de retos abiertos en videojuegos serios y su potencial para facilitar una experiencia significativa para el jugador. Contribuimos con un prototipo de videojuego sobre sostenibilidad en un único prompt de lenguaje natural sobre comunidades energéticas y lo probamos con 13 participantes dentro de ChatGPT-3.5. Dos participantes ya conocían las comunidades energéticas antes del juego, y ocho de los 11 restantes adquirieron conocimientos valiosos sobre el tema específico. Al comparar las evaluaciones de ChatGPT-3.5 de la interacción de los jugadores con la evaluación de un experto, ChatGPT-3.5 evaluó correctamente el 81 % de las respuestas de los jugadores. Nuestros resultados son alentadores y muestran el potencial del uso de los LLMs como agentes mediadores en los juegos educativos, al tiempo que permiten crear fácilmente prototipos de juegos mediante indicaciones en lenguaje natural.",
        "pub8.abstract": "Este artículo propone una metodología para visualizar conjuntos de datos de aprendizaje automático (ML) basados en satélites con el fin de comprender los componentes visuales que se utilizarán como entradas para desarrollar modelos de ML. La metodología propuesta utiliza métodos de incrustación estocástica de vecinos distribuidos t (T-SNE) para crear visualizaciones de imágenes satelitales aprovechando modelos que fueron entrenados previamente en ImageNet. T-SNE es una herramienta de aprendizaje autosupervisado que se utiliza para transformar espacios de alta dimensión en incrustaciones de dos o tres dimensiones, lo que facilita la visualización de un amplio conjunto de datos en una sola imagen o espacio. La metodología se demuestra utilizando el conjunto de datos LUCAS Topsoil Analysis con imágenes satelitales de Sentinel-2. El conjunto de datos se construyó utilizando el TerraSense Toolkit (TSTK). La herramienta de visualización T-SNE tiene como objetivo mejorar la investigación en ML al proporcionar una comprensión visual más clara de los conjuntos de datos basados en satélites.",
        "pub9.abstract": "No podría decir con certeza quién habla ahora, si eres tú Lucas, si es Fernando o si soy yo. Si no pudiera convencerlos de eso, hablaremos a continuación de una novela. Pero eso no sería propósito cierto, pues mi empresa es convencernos de que Mi simón Bolívar (González, 2015) es, pese y gracias a sus niveles de ficción, un ensayo.<br><br>Mi Simón Bolívar (2015) es, como parece evidente, un libro sobre Simón Bolívar. O, más bien, un libro que precede la biografía de Simón Bolívar, pues la biografía sería el segundo volumen. Si ese volumen se hubiese terminado, se habría llamado El Libertador y contendría una grandeza del tamaño de Suramérica. El primer volumen, publicado en 1930, es una meditación que pudiese equivaler a Simón Bolívar en Jamaica o a los últimos días de Jesús en el desierto (González, 2015): meditaciones anteriores a una gran obra vital.<br><br>Lucas Ochoa es un hombre de método y de ello da evidencia desde que a los ocho años escribió su primer ensayo psicológico sobre el Dolor (González, 2015). Para escribir Mi Simón Bolívar ha usado un método que llamó el método emocional. Ochoa se propuso, en carne y espíritu, revivir a Bolívar, vivirlo en sí y dejar que Bolívar viva en él sin perder \"de vista que el universo es el objeto y que no debemos ser poseídos\" (González, 2015, p. 3). Este método podría ser justo eso, revivir a Bolívar — de ahí que el título lleve el posesivo mi—, pero parece ser un proceso más complejo que lo que el libro pudiera vislumbrar y que pretende hacer inseparable la sustancia presente de Ochoa de la sustancia histórica de Bolívar y, a su vez, de la sustancia de Fernando González, el autor de este libro. ¿Cómo se vive con un gran héroe adentro, con una conciencia del tamaño de Suramérica como la tuvo Bolívar?, ¿a qué prudencia y con cuál régimen debe uno someterse para meditar la profunda crisis que fueron sus días gloriosos?",
        "pub10.abstract": "“La elevación paramuna” es un ensayo crítico y poético que traza un mapa alternativo del paisaje fílmico del páramo andino, especialmente en Colombia. Andrés Isaza explora cómo este ecosistema ha sido representado en el cine a lo largo del tiempo, desde los primeros registros de mediados del siglo XX hasta producciones contemporáneas. A través de ejemplos como El páramo de Cumanday, Siete cabezas, Nuestra voz de tierra, memoria y futuro y El valle sin sombras, el autor analiza la dimensión simbólica, ecológica, espiritual y política del páramo en el cine. El texto cuestiona la hegemonía visual del norte global y propone una crítica cartográfica centrada en lo local, incorporando elementos de la geografía, la historia natural, el pensamiento indígena y la memoria colectiva. El ensayo se convierte así en una invitación a ver y pensar el páramo not only as a natural setting, sino como un territorio de resistencia, transformación y profunda sensibilidad humana.",
        "pub11.abstract": "Las cosmovisiones indígenas sitúan a los humanos como profundamente interconectados con la naturaleza. Sin embargo, los materiales digitales a menudo limitan la producción de experiencias no antropocéntricas. Basándonos en trabajos que sitúan el perspectivismo como un principio fundamental para la creación artística, exploramos el pensamiento desde la perspectiva del agua en la creación Being Water, una experiencia interactiva representativa de la confluencia de diferentes medios digitales. Esta colaboración demuestra cómo los medios digitales pueden simular y expresar la agencia de entidades no humanas, desafiando los paradigmas de diseño antropocéntricos. El proyecto incorpora diversos enfoques artísticos, como la captura de video inmersivo por ríos y mares, narrativas poéticas inspiradas en el ciclo del agua, y visuales generados por IA. Apoyando e incorporando Modelos de Lenguaje Grande en el proceso creativo, reflexionamos sobre el papel de las máquinas como herramientas para el perspectivismo mientras destacamos las limitaciones de los sistemas actuales de IA para representar otras perspectivas ontológicas.",
        "pub12.abstract": "Esta investigación explora la importancia de los elementos visuales, específicamente gráficos e ilustraciones, en juegos serios diseñados para fines educativos, dirigidos a adolescentes. El artículo se centra en la aplicabilidad de elementos de diseño para mejorar el compromiso en un juego actualmente en desarrollo que educa sobre comunidades energéticas. El juego, EN-JOIN, utiliza una interfaz basada en texto donde los jugadores interactúan escribiendo respuestas, que son evaluadas por un Modelo de Lenguaje Grande (LLM). Esta \"conversación\" interactiva guía a los jugadores a través de varios niveles, contribuyendo a la narrativa y los objetivos educativos. Nuestro enfoque incorpora diseño inclusivo, enfatizando la representación de diversas culturas, géneros e identidades. Al aprovechar visuales simplificados y simbólicos, buscamos crear una experiencia atractiva y empática sin abrumar a los jugadores. Este estudio aborda los desafíos de equilibrar complejidad y simplicidad en el diseño visual, asegurando que los personajes y escenarios sean identificables pero libres de estereotipos. El juego busca hacer que los jugadores sean conscientes de su impacto ambiental y los anima a participar en prácticas energéticas sostenibles."
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

// --- Unified Language Toggle Logic ---
function setLanguageButtonStates(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

function updatePublicationAbstracts(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const textSpan = el.querySelector('.abstract-text');
        if (textSpan && translations[lang][key]) {
            textSpan.innerHTML = translations[lang][key];
        }
    });
}

function setProjectLanguage(lang, projectKey) {
    const projectData = translations[lang][projectKey];
    if (!projectData) return;

    // Update title
    const titleElement = document.querySelector('.project-detail-title');
    if (titleElement && projectData.title) {
        titleElement.textContent = projectData.title;
    }

    // Update meta information
    const metaEn = document.getElementById('meta-en');
    const metaEs = document.getElementById('meta-es');
    if (metaEn && metaEs && projectData.meta) {
        if (lang === 'en') {
            metaEn.textContent = projectData.meta;
            metaEn.style.display = 'block';
            metaEs.style.display = 'none';
        } else {
            metaEs.textContent = projectData.meta;
            metaEs.style.display = 'block';
            metaEn.style.display = 'none';
        }
    }

    // Update description
    const descEn = document.getElementById('desc-en');
    const descEs = document.getElementById('desc-es');
    if (descEn && descEs && projectData.desc) {
        if (lang === 'en') {
            descEn.innerHTML = projectData.desc;
            descEn.style.display = 'block';
            descEs.style.display = 'none';
        } else {
            descEs.innerHTML = projectData.desc;
            descEs.style.display = 'block';
            descEn.style.display = 'none';
        }
    }

    // Update credits if available
    const creditsElement = document.querySelector('.project-credits');
    if (creditsElement && projectData.credits) {
        creditsElement.innerHTML = projectData.credits;
    }

    // Update review if available
    const reviewElement = document.querySelector('.project-review');
    if (reviewElement && projectData.review) {
        reviewElement.innerHTML = projectData.review;
    }

    // Update awards
    const awardsList = document.querySelector('.project-awards ul');
    if (awardsList && projectData.awards) {
        awardsList.innerHTML = '';
        projectData.awards.forEach(award => {
            const li = document.createElement('li');
            li.textContent = award;
            awardsList.appendChild(li);
        });
    }

    // Update video sources if available
    const videoEn = document.querySelector('.video-en');
    const videoEs = document.querySelector('.video-es');
    if (videoEn && videoEs) {
        if (lang === 'en') {
            videoEn.style.display = 'block';
            videoEs.style.display = 'none';
        } else {
            videoEs.style.display = 'block';
            videoEn.style.display = 'none';
        }
    }
}

function setLanguage(lang) {
    // Update navigation elements
    const projectsLink = document.querySelector('a[href="#projects"]');
    const publicationsLink = document.querySelector('a[href="#publications"]');
    const bioLink = document.querySelector('a[href="#bio"]');
    
    if (projectsLink) projectsLink.textContent = translations[lang].projects;
    if (publicationsLink) publicationsLink.textContent = translations[lang].publications;
    if (bioLink) bioLink.textContent = translations[lang].bio;
    
    // Update bio content using class-based approach
    document.querySelectorAll('.bio-lang').forEach(function(div) {
        div.classList.remove('active');
    });
    document.querySelector(`.bio-lang.bio-lang-${lang}`).classList.add('active');
    
    // Update project titles and meta
    const projectElements = document.querySelectorAll('.project-item');
    projectElements.forEach((project, index) => {
        const projectKey = `project${index + 1}`;
        const projectData = translations[lang][projectKey];
        if (projectData) {
            const titleElement = project.querySelector('.project-title');
            const metaElement = project.querySelector('.project-meta');
            if (titleElement) titleElement.textContent = projectData.title;
            if (metaElement) metaElement.textContent = projectData.meta;
        }
    });
    
    // Update publication abstracts
    updatePublicationAbstracts(lang);
}

function applyLanguage(lang) {
    setLanguageButtonStates(lang);
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
}

function initializeLanguageToggle() {
    // Always read from localStorage
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    applyLanguage(savedLang);
    setLanguage(savedLang); // Ensure publication abstracts are updated on load
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('selectedLanguage', lang);
            applyLanguage(lang);
            // If publications tab is visible, update abstracts immediately
            const publicationsTab = document.getElementById('publications');
            if (publicationsTab && publicationsTab.classList.contains('active')) {
                setTimeout(() => {
                    document.querySelectorAll('[data-translate]').forEach(el => {
                        const key = el.getAttribute('data-translate');
                        const textSpan = el.querySelector('.abstract-text');
                        if (textSpan && translations[lang][key]) {
                            textSpan.innerHTML = translations[lang][key];
                        }
                    });
                }, 0);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeLanguageToggle);
if (document.readyState !== 'loading') {
    initializeLanguageToggle();
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
window.setLanguage = setLanguage; 