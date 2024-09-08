"use client";

import { useState, useEffect } from 'react';

const ParkingLayout = () => {
  // Static data for blocks, pillars, and slots within pillars
  const staticData = [
    {
      name: 'A',
      pillars: [
        { name: 'A1', cars: 5, slots: Array(9).fill(false) },
        { name: 'A2', cars: 3, slots: Array(9).fill(false) },
        { name: 'A3', cars: 4, slots: Array(9).fill(false) },
        { name: 'A4', cars: 1, slots: Array(9).fill(false) }
      ]
    },
    {
      name: 'B',
      pillars: [
        { name: 'B1', cars: 2, slots: Array(9).fill(false) },
        { name: 'B2', cars: 6, slots: Array(9).fill(false) },
        { name: 'B3', cars: 3, slots: Array(9).fill(false) }
      ]
    },
    {
      name: 'C',
      pillars: [
        { name: 'C1', cars: 4, slots: Array(9).fill(false) },
        { name: 'C2', cars: 1, slots: Array(9).fill(false) },
        { name: 'C3', cars: 5, slots: Array(9).fill(false) }
      ]
    }
  ];

  const [blocks, setBlocks] = useState(staticData);
  const [assignedSlot, setAssignedSlot] = useState({ blockIndex: null, pillarIndex: null, slotIndex: null });

  useEffect(() => {
    // Assign a random slot on initial load
    assignRandomSlot(staticData);
  }, []);

  const assignRandomSlot = (blocks) => {
    const randomBlockIndex = Math.floor(Math.random() * blocks.length);
    const randomPillarIndex = Math.floor(Math.random() * blocks[randomBlockIndex].pillars.length);
    const randomSlotIndex = Math.floor(Math.random() * blocks[randomBlockIndex].pillars[randomPillarIndex].slots.length);

    // Update state to reflect the assigned slot
    setAssignedSlot({
      blockIndex: randomBlockIndex,
      pillarIndex: randomPillarIndex,
      slotIndex: randomSlotIndex
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mall Parking Layout</h1>
      <div className="space-y-4">
        {blocks.map((block, blockIndex) => (
          <div key={blockIndex} className="w-full">
            <div className="bg-black text-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Block {block.name}</h2>
              <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar">
                {block.pillars.map((pillar, pillarIndex) => (
                  <div
                    key={pillarIndex}
                    className={`min-w-[150px] p-4 rounded-lg border bg-gray-200 border-gray-300`}
                  >
                    <h3 className="text-lg font-semibold mb-2">{pillar.name}</h3>
                    <p className="text-sm text-gray-700 mb-4">Cars: {pillar.cars}</p>
                    
                    {/* Display slots in a 3x3 grid */}
                    <div className="grid grid-cols-3 gap-1">
                      {pillar.slots.map((occupied, slotIndex) => (
                        <div
                          key={slotIndex}
                          className={`h-6 w-6 border ${
                            blockIndex === assignedSlot.blockIndex &&
                            pillarIndex === assignedSlot.pillarIndex &&
                            slotIndex === assignedSlot.slotIndex
                              ? 'bg-yellow-500 border-yellow-700'
                              : 'bg-gray-100 border-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {assignedSlot.blockIndex !== null && (
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">Assigned Pillar:</p>
          <p className="text-2xl font-bold">
            Block {blocks[assignedSlot.blockIndex].name} - {blocks[assignedSlot.blockIndex].pillars[assignedSlot.pillarIndex].name} - Slot {assignedSlot.slotIndex + 1}
          </p>
        </div>
      )}
    </div>
  );
};

export default ParkingLayout;