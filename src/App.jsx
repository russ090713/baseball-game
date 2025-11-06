import React, { useState } from 'react';
import './App.css';

// Player pools with legends, Big Red Machine, and Cleveland emphasis
const PLAYER_POOLS = {
  C: [
    { name: "Johnny Bench", ba: 0.267, obp: 0.342, slg: 0.476 },
    { name: "Yogi Berra", ba: 0.285, obp: 0.348, slg: 0.482 },
    { name: "Ivan Rodriguez", ba: 0.296, obp: 0.334, slg: 0.464 },
    { name: "Joe Mauer", ba: 0.306, obp: 0.388, slg: 0.439 },
    { name: "Buster Posey", ba: 0.302, obp: 0.372, slg: 0.460 },
    { name: "Mike Piazza", ba: 0.308, obp: 0.377, slg: 0.545 },
    { name: "Jorge Posada", ba: 0.273, obp: 0.374, slg: 0.474 },
    { name: "Yadier Molina", ba: 0.279, obp: 0.334, slg: 0.379 },
    { name: "Victor Martinez", ba: 0.295, obp: 0.360, slg: 0.454 },
    { name: "Salvador Perez", ba: 0.262, obp: 0.297, slg: 0.451 },
    { name: "Brian McCann", ba: 0.262, obp: 0.335, slg: 0.445 },
    { name: "Sandy Alomar Jr", ba: 0.273, obp: 0.309, slg: 0.406 },
    { name: "J.T. Realmuto", ba: 0.278, obp: 0.339, slg: 0.453 },
    { name: "Gary Carter", ba: 0.262, obp: 0.335, slg: 0.439 },
    { name: "Jason Kendall", ba: 0.288, obp: 0.366, slg: 0.369 },
    { name: "Willson Contreras", ba: 0.255, obp: 0.349, slg: 0.466 }
  ],
  "1B": [
    { name: "Tony Perez", ba: 0.279, obp: 0.341, slg: 0.463 },
    { name: "Willie McCovey", ba: 0.270, obp: 0.374, slg: 0.515 },
    { name: "Albert Pujols", ba: 0.296, obp: 0.374, slg: 0.544 },
    { name: "Miguel Cabrera", ba: 0.310, obp: 0.386, slg: 0.527 },
    { name: "Joey Votto", ba: 0.294, obp: 0.409, slg: 0.511 },
    { name: "Paul Goldschmidt", ba: 0.297, obp: 0.398, slg: 0.516 },
    { name: "Freddie Freeman", ba: 0.300, obp: 0.389, slg: 0.505 },
    { name: "Jim Thome", ba: 0.276, obp: 0.402, slg: 0.554 },
    { name: "Todd Helton", ba: 0.316, obp: 0.414, slg: 0.539 },
    { name: "Prince Fielder", ba: 0.283, obp: 0.382, slg: 0.506 },
    { name: "Carlos Santana", ba: 0.246, obp: 0.365, slg: 0.432 },
    { name: "Carlos Delgado", ba: 0.280, obp: 0.383, slg: 0.546 },
    { name: "Jeff Bagwell", ba: 0.297, obp: 0.408, slg: 0.540 },
    { name: "Frank Thomas", ba: 0.301, obp: 0.419, slg: 0.555 },
    { name: "Vladimir Guerrero Jr", ba: 0.285, obp: 0.359, slg: 0.494 },
    { name: "Matt Olson", ba: 0.249, obp: 0.331, slg: 0.508 }
  ],
  "2B": [
    { name: "Joe Morgan", ba: 0.271, obp: 0.392, slg: 0.427 },
    { name: "Rogers Hornsby", ba: 0.358, obp: 0.434, slg: 0.577 },
    { name: "Robinson Cano", ba: 0.302, obp: 0.350, slg: 0.490 },
    { name: "Chase Utley", ba: 0.275, obp: 0.358, slg: 0.465 },
    { name: "Jose Altuve", ba: 0.307, obp: 0.353, slg: 0.451 },
    { name: "Dustin Pedroia", ba: 0.299, obp: 0.365, slg: 0.439 },
    { name: "Roberto Alomar", ba: 0.300, obp: 0.371, slg: 0.443 },
    { name: "Jeff Kent", ba: 0.290, obp: 0.356, slg: 0.500 },
    { name: "Brandon Phillips", ba: 0.275, obp: 0.319, slg: 0.422 },
    { name: "DJ LeMahieu", ba: 0.304, obp: 0.358, slg: 0.428 },
    { name: "Jason Kipnis", ba: 0.260, obp: 0.335, slg: 0.420 },
    { name: "Whit Merrifield", ba: 0.284, obp: 0.325, slg: 0.409 },
    { name: "Ryne Sandberg", ba: 0.285, obp: 0.344, slg: 0.452 },
    { name: "Craig Biggio", ba: 0.281, obp: 0.363, slg: 0.433 },
    { name: "Carlos Baerga", ba: 0.291, obp: 0.332, slg: 0.433 },
    { name: "Ian Kinsler", ba: 0.269, obp: 0.333, slg: 0.438 }
  ],
  "3B": [
    { name: "Mike Schmidt", ba: 0.267, obp: 0.380, slg: 0.527 },
    { name: "George Brett", ba: 0.305, obp: 0.369, slg: 0.487 },
    { name: "Wade Boggs", ba: 0.328, obp: 0.415, slg: 0.443 },
    { name: "Chipper Jones", ba: 0.303, obp: 0.401, slg: 0.529 },
    { name: "Adrian Beltre", ba: 0.286, obp: 0.339, slg: 0.480 },
    { name: "Scott Rolen", ba: 0.281, obp: 0.364, slg: 0.490 },
    { name: "Manny Machado", ba: 0.282, obp: 0.342, slg: 0.487 },
    { name: "Nolan Arenado", ba: 0.290, obp: 0.349, slg: 0.518 },
    { name: "David Wright", ba: 0.296, obp: 0.376, slg: 0.491 },
    { name: "Rafael Devers", ba: 0.282, obp: 0.342, slg: 0.509 },
    { name: "Josh Donaldson", ba: 0.270, obp: 0.362, slg: 0.489 },
    { name: "Kris Bryant", ba: 0.272, obp: 0.376, slg: 0.488 },
    { name: "Alex Rodriguez", ba: 0.295, obp: 0.380, slg: 0.550 },
    { name: "Travis Fryman", ba: 0.274, obp: 0.336, slg: 0.439 },
    { name: "Jose Ramirez", ba: 0.278, obp: 0.355, slg: 0.490 },
    { name: "Anthony Rendon", ba: 0.290, obp: 0.369, slg: 0.471 }
  ],
  SS: [
    { name: "Honus Wagner", ba: 0.328, obp: 0.391, slg: 0.467 },
    { name: "Ozzie Smith", ba: 0.262, obp: 0.337, slg: 0.328 },
    { name: "Barry Larkin", ba: 0.295, obp: 0.371, slg: 0.444 },
    { name: "Derek Jeter", ba: 0.310, obp: 0.377, slg: 0.440 },
    { name: "Cal Ripken Jr", ba: 0.276, obp: 0.340, slg: 0.447 },
    { name: "Nomar Garciaparra", ba: 0.313, obp: 0.361, slg: 0.521 },
    { name: "Francisco Lindor", ba: 0.272, obp: 0.337, slg: 0.460 },
    { name: "Troy Tulowitzki", ba: 0.290, obp: 0.361, slg: 0.495 },
    { name: "Xander Bogaerts", ba: 0.292, obp: 0.356, slg: 0.456 },
    { name: "Corey Seager", ba: 0.286, obp: 0.357, slg: 0.497 },
    { name: "Omar Vizquel", ba: 0.272, obp: 0.336, slg: 0.352 },
    { name: "Trea Turner", ba: 0.302, obp: 0.353, slg: 0.471 },
    { name: "Carlos Correa", ba: 0.277, obp: 0.357, slg: 0.467 },
    { name: "Tim Anderson", ba: 0.282, obp: 0.318, slg: 0.428 },
    { name: "Bo Bichette", ba: 0.290, obp: 0.330, slg: 0.465 },
    { name: "Dansby Swanson", ba: 0.254, obp: 0.324, slg: 0.433 }
  ],
  LF: [
    { name: "Ted Williams", ba: 0.344, obp: 0.482, slg: 0.634 },
    { name: "Stan Musial", ba: 0.331, obp: 0.417, slg: 0.559 },
    { name: "Barry Bonds", ba: 0.298, obp: 0.444, slg: 0.607 },
    { name: "Manny Ramirez", ba: 0.312, obp: 0.411, slg: 0.585 },
    { name: "Albert Belle", ba: 0.295, obp: 0.369, slg: 0.564 },
    { name: "Christian Yelich", ba: 0.285, obp: 0.370, slg: 0.470 },
    { name: "Michael Brantley", ba: 0.298, obp: 0.358, slg: 0.446 },
    { name: "Ryan Braun", ba: 0.296, obp: 0.358, slg: 0.532 },
    { name: "Matt Holliday", ba: 0.299, obp: 0.378, slg: 0.509 },
    { name: "Juan Gonzalez", ba: 0.295, obp: 0.343, slg: 0.561 },
    { name: "Juan Soto", ba: 0.285, obp: 0.421, slg: 0.516 },
    { name: "Eddie Rosario", ba: 0.275, obp: 0.315, slg: 0.464 },
    { name: "Rickey Henderson", ba: 0.279, obp: 0.401, slg: 0.419 },
    { name: "Kyle Schwarber", ba: 0.230, obp: 0.338, slg: 0.478 },
    { name: "Marcell Ozuna", ba: 0.274, obp: 0.332, slg: 0.478 },
    { name: "Randy Arozarena", ba: 0.255, obp: 0.331, slg: 0.435 }
  ],
  CF: [
    { name: "Willie Mays", ba: 0.302, obp: 0.384, slg: 0.557 },
    { name: "Mickey Mantle", ba: 0.298, obp: 0.421, slg: 0.557 },
    { name: "Mike Trout", ba: 0.301, obp: 0.410, slg: 0.581 },
    { name: "Ken Griffey Jr", ba: 0.284, obp: 0.370, slg: 0.538 },
    { name: "Carlos Beltran", ba: 0.279, obp: 0.350, slg: 0.486 },
    { name: "Jim Edmonds", ba: 0.284, obp: 0.376, slg: 0.527 },
    { name: "Andrew McCutchen", ba: 0.288, obp: 0.373, slg: 0.467 },
    { name: "Grady Sizemore", ba: 0.281, obp: 0.364, slg: 0.491 },
    { name: "George Springer", ba: 0.266, obp: 0.361, slg: 0.488 },
    { name: "Cody Bellinger", ba: 0.254, obp: 0.341, slg: 0.491 },
    { name: "Kenny Lofton", ba: 0.299, obp: 0.372, slg: 0.423 },
    { name: "Torii Hunter", ba: 0.277, obp: 0.331, slg: 0.460 },
    { name: "Curtis Granderson", ba: 0.249, obp: 0.339, slg: 0.461 },
    { name: "Coco Crisp", ba: 0.269, obp: 0.330, slg: 0.405 },
    { name: "Michael Bourn", ba: 0.266, obp: 0.330, slg: 0.365 },
    { name: "Byron Buxton", ba: 0.244, obp: 0.312, slg: 0.468 }
  ],
  RF: [
    { name: "Babe Ruth", ba: 0.342, obp: 0.474, slg: 0.690 },
    { name: "Hank Aaron", ba: 0.305, obp: 0.374, slg: 0.555 },
    { name: "Roberto Clemente", ba: 0.317, obp: 0.359, slg: 0.475 },
    { name: "Mookie Betts", ba: 0.295, obp: 0.368, slg: 0.514 },
    { name: "Ichiro Suzuki", ba: 0.311, obp: 0.355, slg: 0.402 },
    { name: "Larry Walker", ba: 0.313, obp: 0.400, slg: 0.565 },
    { name: "Vladimir Guerrero", ba: 0.318, obp: 0.379, slg: 0.553 },
    { name: "Giancarlo Stanton", ba: 0.267, obp: 0.357, slg: 0.554 },
    { name: "Bryce Harper", ba: 0.280, obp: 0.389, slg: 0.512 },
    { name: "J.D. Martinez", ba: 0.285, obp: 0.358, slg: 0.530 },
    { name: "Aaron Judge", ba: 0.276, obp: 0.384, slg: 0.579 },
    { name: "Ronald Acuna Jr", ba: 0.281, obp: 0.372, slg: 0.516 },
    { name: "Shin-Soo Choo", ba: 0.275, obp: 0.377, slg: 0.441 },
    { name: "Nelson Cruz", ba: 0.279, obp: 0.348, slg: 0.524 },
    { name: "Tony Gwynn", ba: 0.338, obp: 0.388, slg: 0.459 },
    { name: "Starling Marte", ba: 0.287, obp: 0.339, slg: 0.443 }
  ],
  DH: [
    { name: "David Ortiz", ba: 0.286, obp: 0.380, slg: 0.552 },
    { name: "Edgar Martinez", ba: 0.312, obp: 0.418, slg: 0.515 },
    { name: "Frank Thomas", ba: 0.301, obp: 0.419, slg: 0.555 },
    { name: "Travis Hafner", ba: 0.273, obp: 0.377, slg: 0.499 },
    { name: "Adam Dunn", ba: 0.237, obp: 0.364, slg: 0.490 },
    { name: "Yordan Alvarez", ba: 0.295, obp: 0.393, slg: 0.563 },
    { name: "Shohei Ohtani", ba: 0.274, obp: 0.356, slg: 0.532 },
    { name: "Mark McGwire", ba: 0.263, obp: 0.394, slg: 0.588 },
    { name: "Rafael Palmeiro", ba: 0.288, obp: 0.371, slg: 0.515 },
    { name: "Gary Sheffield", ba: 0.292, obp: 0.393, slg: 0.514 },
    { name: "Carlos Delgado", ba: 0.280, obp: 0.383, slg: 0.546 },
    { name: "Nelson Cruz", ba: 0.279, obp: 0.348, slg: 0.524 },
    { name: "Jose Canseco", ba: 0.266, obp: 0.353, slg: 0.515 },
    { name: "Mo Vaughn", ba: 0.293, obp: 0.383, slg: 0.523 },
    { name: "Jim Rice", ba: 0.298, obp: 0.352, slg: 0.502 },
    { name: "Edwin Encarnacion", ba: 0.263, obp: 0.357, slg: 0.489 }
  ],
  SP: [
    { name: "Sandy Koufax", era: 2.76, whip: 1.11, kper9: 9.28 },
    { name: "Bob Gibson", era: 2.91, whip: 1.19, kper9: 7.22 },
    { name: "Tom Seaver", era: 2.86, whip: 1.12, kper9: 6.74 },
    { name: "Greg Maddux", era: 3.16, whip: 1.14, kper9: 6.07 },
    { name: "Pedro Martinez", era: 2.93, whip: 1.05, kper9: 10.04 },
    { name: "Randy Johnson", era: 3.29, whip: 1.17, kper9: 10.61 },
    { name: "Roger Clemens", era: 3.12, whip: 1.17, kper9: 8.58 },
    { name: "Clayton Kershaw", era: 2.48, whip: 1.00, kper9: 9.83 },
    { name: "Max Scherzer", era: 3.15, whip: 1.11, kper9: 11.08 },
    { name: "Justin Verlander", era: 3.24, whip: 1.13, kper9: 9.55 },
    { name: "CC Sabathia", era: 3.74, whip: 1.26, kper9: 8.70 },
    { name: "Roy Halladay", era: 3.38, whip: 1.18, kper9: 6.93 },
    { name: "Curt Schilling", era: 3.46, whip: 1.14, kper9: 8.60 },
    { name: "Johan Santana", era: 3.20, whip: 1.13, kper9: 9.60 },
    { name: "Cliff Lee", era: 3.52, whip: 1.17, kper9: 7.89 },
    { name: "Zack Greinke", era: 3.42, whip: 1.17, kper9: 8.59 },
    { name: "Chris Sale", era: 3.03, whip: 1.04, kper9: 11.08 },
    { name: "Corey Kluber", era: 3.44, whip: 1.09, kper9: 9.72 },
    { name: "Jacob deGrom", era: 2.52, whip: 0.99, kper9: 11.19 },
    { name: "Felix Hernandez", era: 3.42, whip: 1.20, kper9: 8.14 },
    { name: "Cole Hamels", era: 3.43, whip: 1.22, kper9: 8.91 },
    { name: "Gerrit Cole", era: 3.18, whip: 1.04, kper9: 11.53 },
    { name: "David Price", era: 3.31, whip: 1.14, kper9: 9.01 },
    { name: "Madison Bumgarner", era: 3.13, whip: 1.11, kper9: 8.66 },
    { name: "Stephen Strasburg", era: 3.24, whip: 1.10, kper9: 10.59 },
    { name: "Shane Bieber", era: 3.22, whip: 1.02, kper9: 11.71 },
    { name: "John Smoltz", era: 3.33, whip: 1.18, kper9: 7.47 },
    { name: "Mike Mussina", era: 3.68, whip: 1.19, kper9: 7.11 },
    { name: "Roy Oswalt", era: 3.36, whip: 1.20, kper9: 7.50 },
    { name: "Andy Pettitte", era: 3.85, whip: 1.35, kper9: 6.57 },
    { name: "Corbin Burnes", era: 3.01, whip: 1.01, kper9: 11.54 },
    { name: "Walker Buehler", era: 3.16, whip: 1.02, kper9: 10.60 }
  ],
  RP: [
    { name: "Dennis Eckersley", era: 3.50, whip: 1.16, kper9: 6.66 },
    { name: "Rollie Fingers", era: 2.90, whip: 1.15, kper9: 5.35 },
    { name: "Rich Gossage", era: 3.01, whip: 1.23, kper9: 7.46 },
    { name: "Mariano Rivera", era: 2.21, whip: 1.00, kper9: 8.20 },
    { name: "Trevor Hoffman", era: 2.87, whip: 1.06, kper9: 9.36 },
    { name: "Billy Wagner", era: 2.31, whip: 0.99, kper9: 11.92 },
    { name: "Kenley Jansen", era: 2.46, whip: 0.98, kper9: 12.12 },
    { name: "Craig Kimbrel", era: 2.47, whip: 0.99, kper9: 14.71 },
    { name: "Aroldis Chapman", era: 2.48, whip: 1.08, kper9: 15.27 },
    { name: "Edwin Diaz", era: 2.93, whip: 0.99, kper9: 14.76 },
    { name: "Josh Hader", era: 2.53, whip: 0.85, kper9: 15.96 },
    { name: "Jonathan Papelbon", era: 2.44, whip: 1.05, kper9: 10.35 },
    { name: "Francisco Rodriguez", era: 2.86, whip: 1.17, kper9: 10.77 },
    { name: "Joe Nathan", era: 2.87, whip: 1.12, kper9: 10.34 },
    { name: "Andrew Miller", era: 3.24, whip: 1.13, kper9: 13.12 },
    { name: "Cody Allen", era: 2.98, whip: 1.10, kper9: 12.37 },
    { name: "Zack Britton", era: 2.81, whip: 1.15, kper9: 8.75 },
    { name: "Wade Davis", era: 2.93, whip: 1.11, kper9: 11.37 },
    { name: "Brad Hand", era: 3.19, whip: 1.20, kper9: 11.82 },
    { name: "Ryan Pressly", era: 2.98, whip: 1.09, kper9: 11.13 },
    { name: "Liam Hendriks", era: 2.84, whip: 1.00, kper9: 12.70 },
    { name: "Devin Williams", era: 1.83, whip: 0.79, kper9: 15.62 },
    { name: "Bob Wickman", era: 3.93, whip: 1.37, kper9: 5.99 },
    { name: "Jose Mesa", era: 4.36, whip: 1.43, kper9: 6.77 },
    { name: "Chris Perez", era: 3.32, whip: 1.32, kper9: 10.29 },
    { name: "Rafael Betancourt", era: 2.98, whip: 1.16, kper9: 8.37 },
    { name: "Troy Percival", era: 3.17, whip: 1.23, kper9: 10.10 },
    { name: "Robb Nen", era: 2.98, whip: 1.22, kper9: 10.39 },
    { name: "John Wetteland", era: 2.93, whip: 1.14, kper9: 9.18 },
    { name: "Brad Lidge", era: 3.54, whip: 1.28, kper9: 11.58 },
    { name: "J.J. Putz", era: 3.28, whip: 1.11, kper9: 10.81 },
    { name: "Roberto Osuna", era: 2.87, whip: 1.08, kper9: 10.00 },
    { name: "Greg Holland", era: 2.85, whip: 1.11, kper9: 11.63 },
    { name: "Sergio Romo", era: 2.99, whip: 1.08, kper9: 10.15 },
    { name: "Kirby Yates", era: 3.14, whip: 1.05, kper9: 12.67 },
    { name: "David Robertson", era: 2.88, whip: 1.14, kper9: 11.56 },
    { name: "Dellin Betances", era: 2.36, whip: 0.98, kper9: 14.43 },
    { name: "Corey Knebel", era: 3.34, whip: 1.13, kper9: 13.76 },
    { name: "Blake Treinen", era: 2.93, whip: 1.14, kper9: 9.30 },
    { name: "Keith Foulke", era: 3.33, whip: 1.20, kper9: 8.21 }
  ]
};

const POSITIONS = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH', 'SP', 'RP1', 'RP2'];

function App() {
  const [step, setStep] = useState('menu');
  const [draftStep, setDraftStep] = useState('team1');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});
  const [results, setResults] = useState(null);

  const selectPlayer = (player) => {
    const pos = POSITIONS[currentPosition];
    
    if (draftStep === 'team1') {
      setTeam1({ ...team1, [pos]: player });
    } else {
      setTeam2({ ...team2, [pos]: player });
    }

    if (currentPosition < POSITIONS.length - 1) {
      setCurrentPosition(currentPosition + 1);
    } else if (draftStep === 'team1') {
      setDraftStep('team2');
      setCurrentPosition(0);
    } else {
      runSimulation();
    }
  };

  const goBack = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    } else if (draftStep === 'team2') {
      setDraftStep('team1');
      setCurrentPosition(POSITIONS.length - 1);
    }
  };

  const simulateGame = (lineup1, sp1, rp1, lineup2, sp2, rp2) => {
    let score1 = 0, score2 = 0;
    let batterIndex1 = 0; // Track position in batting order
    let batterIndex2 = 0;

    // Add game-day variance for each player (hot/cold day)
    const variance1 = lineup1.map(() => 0.85 + Math.random() * 0.3); // 0.85 to 1.15 multiplier
    const variance2 = lineup2.map(() => 0.85 + Math.random() * 0.3);
    
    // Add pitcher variance (good/bad outing)
    const spVariance1 = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
    const spVariance2 = 0.9 + Math.random() * 0.2;
    const rpVariance1 = [0.9 + Math.random() * 0.2, 0.9 + Math.random() * 0.2];
    const rpVariance2 = [0.9 + Math.random() * 0.2, 0.9 + Math.random() * 0.2];

    // Helper function to simulate a single at-bat
    const simulateAtBat = (batter, batterVariance, pitcher, pitcherVariance) => {
      // Adjust stats for game-day performance
      const adjustedOBP = Math.min(0.550, batter.obp * batterVariance * (1.3 - (pitcher.era * pitcherVariance) / 6));
      const adjustedSLG = batter.slg * batterVariance;
      const adjustedBA = batter.ba * batterVariance;
      
      // Determine if batter reaches base
      if (Math.random() > adjustedOBP) {
        return { outcome: 'out', bases: 0, runs: 0 };
      }
      
      // Batter reached base - determine hit type
      const powerFactor = adjustedSLG - adjustedBA;
      const rand = Math.random();
      
      if (rand < powerFactor * 0.35) {
        // Home run
        return { outcome: 'HR', bases: 4, runs: 1 };
      } else if (rand < powerFactor * 0.55) {
        // Extra base hit (double or triple)
        if (Math.random() < 0.15) {
          return { outcome: '3B', bases: 3, runs: 0 };
        }
        return { outcome: '2B', bases: 2, runs: 0 };
      } else {
        // Single or walk
        return { outcome: '1B', bases: 1, runs: 0 };
      }
    };

    // Simulate base runners advancing and scoring
    const simulateBaseRunners = (bases, runners) => {
      let runsScored = 0;
      let newRunners = [...runners];
      
      if (bases === 4) {
        // Home run - everyone scores
        runsScored = 1 + runners.reduce((sum, r) => sum + r, 0);
        newRunners = [0, 0, 0];
      } else if (bases === 3) {
        // Triple - everyone scores
        runsScored = runners.reduce((sum, r) => sum + r, 0);
        newRunners = [0, 0, 1];
      } else if (bases === 2) {
        // Double - runner on 1st to 3rd, runner on 2nd/3rd scores
        runsScored = runners[1] + runners[2];
        newRunners = [0, 1, runners[0]];
      } else if (bases === 1) {
        // Single - runner on 2nd/3rd scores, runner on 1st to 2nd
        runsScored = runners[1] + runners[2];
        if (Math.random() < 0.4 && runners[0] === 1) {
          // 40% chance runner on 1st scores on single
          runsScored += 1;
          newRunners = [1, 0, 0];
        } else {
          newRunners = [1, runners[0], 0];
        }
      }
      
      return { runsScored, newRunners };
    };

    // Simulate each half-inning
    const simulateHalfInning = (lineup, lineupVariance, pitcher, pitcherVariance, batterIndex) => {
      let outs = 0;
      let runs = 0;
      let runners = [0, 0, 0]; // [1st, 2nd, 3rd]
      let currentBatterIndex = batterIndex;
      let atBats = 0;
      
      while (outs < 3 && atBats < 50) { // Safety limit
        const batter = lineup[currentBatterIndex];
        const variance = lineupVariance[currentBatterIndex];
        const result = simulateAtBat(batter, variance, pitcher, pitcherVariance);
        
        if (result.outcome === 'out') {
          outs++;
        } else {
          const advancement = simulateBaseRunners(result.bases, runners);
          runs += advancement.runsScored + result.runs;
          runners = advancement.newRunners;
        }
        
        currentBatterIndex = (currentBatterIndex + 1) % lineup.length;
        atBats++;
      }
      
      return { runs, newBatterIndex: currentBatterIndex };
    };

    // Simulate 9 innings
    for (let inning = 1; inning <= 9; inning++) {
      let pitcher1, pitcher2, pVariance1, pVariance2;
      
      if (inning <= 6) {
        // Starting pitchers
        pitcher1 = sp2;
        pitcher2 = sp1;
        pVariance1 = spVariance2;
        pVariance2 = spVariance1;
      } else if (inning <= 8) {
        // First reliever
        pitcher1 = rp2[0];
        pitcher2 = rp1[0];
        pVariance1 = rpVariance2[0];
        pVariance2 = rpVariance1[0];
      } else {
        // Closer
        pitcher1 = rp2[1];
        pitcher2 = rp1[1];
        pVariance1 = rpVariance2[1];
        pVariance2 = rpVariance1[1];
      }
      
      // Team 1 bats (top of inning)
      const top = simulateHalfInning(lineup1, variance1, pitcher1, pVariance1, batterIndex1);
      score1 += top.runs;
      batterIndex1 = top.newBatterIndex;
      
      // Team 2 bats (bottom of inning)
      // Skip bottom of 9th if Team 2 is winning
      if (inning === 9 && score2 > score1) {
        break;
      }
      
      const bottom = simulateHalfInning(lineup2, variance2, pitcher2, pVariance2, batterIndex2);
      score2 += bottom.runs;
      batterIndex2 = bottom.newBatterIndex;
      
      // Walk-off check
      if (inning === 9 && score2 > score1) {
        break;
      }
    }
    
    // Extra innings if tied
    let extraInning = 10;
    while (score1 === score2 && extraInning < 15) {
      const pitcher1 = rp2[1];
      const pitcher2 = rp1[1];
      const pVariance1 = rpVariance2[1];
      const pVariance2 = rpVariance1[1];
      
      const top = simulateHalfInning(lineup1, variance1, pitcher1, pVariance1, batterIndex1);
      score1 += top.runs;
      batterIndex1 = top.newBatterIndex;
      
      const bottom = simulateHalfInning(lineup2, variance2, pitcher2, pVariance2, batterIndex2);
      score2 += bottom.runs;
      batterIndex2 = bottom.newBatterIndex;
      
      if (score2 > score1) break;
      extraInning++;
    }

    return { score1, score2 };
  };

  const runSimulation = () => {
    const lineup1 = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'].map(p => team1[p]);
    const lineup2 = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'].map(p => team2[p]);
    
    const games = [];
    let wins1 = 0, wins2 = 0;

    for (let i = 0; i < 7 && wins1 < 4 && wins2 < 4; i++) {
      const game = simulateGame(lineup1, team1.SP, [team1.RP1, team1.RP2], lineup2, team2.SP, [team2.RP1, team2.RP2]);
      games.push(game);
      if (game.score1 > game.score2) wins1++; else wins2++;
    }

    setResults({ games, wins1, wins2, team1, team2 });
    setStep('results');
  };

  if (step === 'menu') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0fdf4, #dbeafe)', padding: '2rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>⚾ Baseball Draft Simulator</h1>
            <button
              onClick={() => { setStep('draft'); setDraftStep('team1'); setCurrentPosition(0); setTeam1({}); setTeam2({}); }}
              style={{ width: '100%', background: '#16a34a', color: 'white', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
            >
              Start Draft & Simulate Series
            </button>
            <div style={{ marginTop: '2rem', background: '#dbeafe', borderLeft: '4px solid #3b82f6', padding: '1rem', borderRadius: '0.25rem' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Player Pool (1992-2025)</h2>
              <p style={{ fontSize: '0.875rem' }}>✅ 15 players per position</p>
              <p style={{ fontSize: '0.875rem' }}>✅ 30 Starting Pitchers</p>
              <p style={{ fontSize: '0.875rem' }}>✅ 40 Relief Pitchers</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Legends + Big Red Machine + Cleveland emphasis!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'draft') {
    const pos = POSITIONS[currentPosition];
    const pool = pos === 'RP1' || pos === 'RP2' ? PLAYER_POOLS.RP : PLAYER_POOLS[pos];
    const isPitcher = pos === 'SP' || pos === 'RP1' || pos === 'RP2';
    const team = draftStep === 'team1' ? 'Team 1' : 'Team 2';
    const color = draftStep === 'team1' ? '#3b82f6' : '#ef4444';

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0fdf4, #dbeafe)', padding: '2rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color, marginBottom: '1rem' }}>{team} Draft</h1>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Position {currentPosition + 1} of {POSITIONS.length}</p>
            <div style={{ background: '#f3f4f6', height: '0.75rem', borderRadius: '9999px', marginBottom: '1.5rem' }}>
              <div style={{ background: color, height: '0.75rem', borderRadius: '9999px', width: `${((currentPosition + 1) / POSITIONS.length) * 100}%`, transition: 'width 0.3s' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Select your {pos}</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Click on a player to draft them</p>
            <div style={{ maxHeight: '24rem', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {pool.map((player, i) => (
                <button
                  key={i}
                  onClick={() => selectPlayer(player)}
                  style={{ width: '100%', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '0.75rem', textAlign: 'left', cursor: 'pointer' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#3b82f6'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.25rem' }}>{player.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {isPitcher ? `ERA: ${player.era} | WHIP: ${player.whip} | K/9: ${player.kper9}` : `BA: ${player.ba} | OBP: ${player.obp} | SLG: ${player.slg}`}
                  </div>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {(currentPosition > 0 || draftStep === 'team2') && (
                <button onClick={goBack} style={{ padding: '0.75rem 1.5rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', background: 'white', fontWeight: '600', cursor: 'pointer' }}>Back</button>
              )}
              <button onClick={() => setStep('menu')} style={{ padding: '0.75rem 1.5rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', background: 'white', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    const winner = results.wins1 > results.wins2 ? 'Team 1' : 'Team 2';
    const color = results.wins1 > results.wins2 ? '#3b82f6' : '#ef4444';

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0fdf4, #dbeafe)', padding: '2rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>🏆 Series Results</h1>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>{winner} Wins the Series!</div>
              <div style={{ fontSize: '1.25rem', color: '#6b7280', marginTop: '0.5rem' }}>{results.wins1} - {results.wins2}</div>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Game by Game Results</h2>
            {results.games.map((g, i) => (
              <div key={i} style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600' }}>Game {i + 1}</span>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: g.score1 > g.score2 ? '#3b82f6' : '#9ca3af' }}>Team 1: {g.score1}</span>
                  <span style={{ fontWeight: 'bold', color: g.score2 > g.score1 ? '#ef4444' : '#9ca3af' }}>Team 2: {g.score2}</span>
                </div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem' }}>
                <h3 style={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '0.75rem' }}>Team 1 Roster</h3>
                {Object.entries(results.team1).map(([p, pl]) => (
                  <div key={p} style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '600' }}>{p}:</span>
                    <span>{pl.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem' }}>
                <h3 style={{ fontWeight: 'bold', color: '#991b1b', marginBottom: '0.75rem' }}>Team 2 Roster</h3>
                {Object.entries(results.team2).map(([p, pl]) => (
                  <div key={p} style={{ fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '600' }}>{p}:</span>
                    <span>{pl.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => { setStep('menu'); setResults(null); }} style={{ width: '100%', background: '#3b82f6', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
