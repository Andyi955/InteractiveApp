import React, { useEffect } from 'react';
const moodColors = {
    happy: '#ff0',
    sad: '#00f',
    angry: '#f00',
    surprised: '#0f0',
    relaxed: '#f0f'
  };


const MoodSelector = () => {
  
    useEffect(() => {
        displayGreeting();
    
        const emojis = document.querySelectorAll('.emoji');
        const emojiContainer = document.querySelector('.emojis');
        const rectangle = document.getElementById('content');
    
        emojis.forEach(emoji => {
          emoji.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            let message;
            let color = moodColors[mood];
    
            // Add the 'active' class and mood class to the selected emoji
      this.classList.add('active', mood);
            // Remove the 'active' class from all emojis
            emojis.forEach(emoji => {
              emoji.classList.remove('active');
            });
    
            switch (mood) {
                case 'happy':
                  message = "That's wonderful! Keep smiling!";
                  break;
                case 'sad':
                  message = "It's okay to feel sad sometimes. Tomorrow is a new day!";
                  break;
                case 'angry':
                  message = "Take a deep breath. It'll be okay.";
                  break;
                case 'surprised':
                  message = "Oh! What surprised you?";
                  break;
                case 'relaxed':
                  message = "Enjoy the calm and tranquility.";
                  break;
                default:
                  message = "Unknown mood. Please select a valid mood.";
                  break;
              }
            document.getElementById('moodMessage').textContent = message;
            emojiContainer.style.backgroundColor = color; // Change the background color of the emoji container based on mood
            // Change the box shadow color of the rectangle based on mood
      rectangle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`;
    
            //setCurrentMood(mood); // Set the current mood
            // Add the 'active' class to the selected emoji
            this.classList.add('active');
          });
        });
    
        const neonButton = document.querySelector('.neon-button');
        let isClicked = false;
      
        neonButton && neonButton.addEventListener('click', function(event) {
            if (!event.target.classList.contains('emoji')) {
              if (!isClicked) {
                this.classList.add('clicked');
                changeColor.call(this, emojiContainer, rectangle); // Change color on click
                isClicked = true;
              } else {
                this.classList.remove('clicked');
                isClicked = false;
              }
            }
          });
          
      
        const changeColor = (emojiContainer, rectangle) => {
            const randomColor = getRandomColor();
            neonButton.style.backgroundColor = randomColor;
            neonButton.style.color = getRandomColor();
          
            // Add neon glow to the canvas
            const canvas = document.getElementById('renderCanvas');
            canvas.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}, 0 0 30px ${randomColor}, 0 0 40px ${randomColor}`;
          
            // Change color of emojis
      const emojis = document.querySelectorAll('.emoji');
      emojis.forEach((emoji) => {
        const mood = emoji.getAttribute('data-mood');
        ['happy-glow', 'sad-glow', /* other mood classes */].forEach((glowClass) => {
          emojiContainer.classList.remove(glowClass);
          rectangle.classList.remove(glowClass); // For the canvas glow
        });
        // Add the correct glow class
        const glowClass = mood + '-glow';
        emojiContainer.classList.add(glowClass);
        rectangle.classList.add(glowClass); // For the canvas glow
        // Add the 'active' class and mood class to the selected emoji
        emoji.classList.add('active', mood);
      });
    
    };
        
     
    
    
        function displayGreeting() {
          const now = new Date();
          const hour = now.getHours();
          let greeting;
    
          if (hour >= 5 && hour < 12) {
            greeting = "Good morning!";
          } else if (hour >= 12 && hour < 17) {
            greeting = "Good afternoon!";
          } else if (hour >= 17 && hour < 21) {
            greeting = "Good evening!";
          } else {
            greeting = "Good night!";
          }
    
          document.getElementById('dynamicGreeting').textContent = greeting;
        }
    
        function getRandomColor() {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
    
      }, []);
    // ... all the code you provided, including the event listeners and functions ...

  return (
    
      <div className="emoji-container">
        <h2>How are you feeling today?</h2>
        <div className="emojis">
          <span className="emoji" data-mood="happy">😊</span>
          <span className="emoji" data-mood="sad">😢</span>
          <span className="emoji" data-mood="angry">😠</span>
          <span className="emoji" data-mood="surprised">😮</span>
          <span className="emoji" data-mood="relaxed">😌</span>
        </div>
        <div id="moodMessage"></div>
      </div>
    
  );
};

export default MoodSelector;
