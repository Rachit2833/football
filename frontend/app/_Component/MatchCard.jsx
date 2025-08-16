import { Card, CardContent } from '../../components/ui/card';
import Image from 'next/image';
import React from 'react';

// Stage color mapping
const stageStyles = {
  League: {
    ribbon: 'bg-green-500 text-white',
    card: 'bg-white dark:bg-gray-900',
  },
  Knockouts: {
    ribbon: 'bg-yellow-500 text-black',
    card: 'bg-yellow-50 dark:bg-yellow-900/30',
  },
  Final: {
    ribbon: 'bg-red-600 text-white',
    card: 'bg-red-50 dark:bg-red-900/30',
  },
};

const MatchCard = ({ item }) => {
  const styles = stageStyles[item.stage] || stageStyles.League;

  return (
    <Card
      data-testid="test-card"
      className={`mx-auto max-w-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative ${styles.card}`}
    >
      {/* Ribbon */}
      <div
        className={`absolute top-0 left-0 px-3 py-1 text-sm font-semibold rounded-br-lg ${styles.ribbon}`}
      >
        {item.stage}
      </div>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6">
        {/* Left section: Header + Match info */}
        <div className="space-y-3 text-center md:text-left">
          {/* Date */}
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>

          {/* Teams */}
          <div className="text-lg font-bold text-[royalBlue] dark:text-blue-400">
            <span>{item.teamAName}</span>
            <span className="text-gray-600 dark:text-gray-300 mx-1">vs</span>
            <span>{item.teamBName}</span>
          </div>
        </div>

        {/* Right section: Image */}
        <div className="relative w-full h-40 md:h-36 rounded-lg overflow-hidden shadow-md">
          <span>MAtchCard</span>
          <Image
            src="/jason-charters-IorqsMssQH0-unsplash.jpg"
            alt={`${item.teamAName} vs ${item.teamBName} played on ${item.date}`}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
