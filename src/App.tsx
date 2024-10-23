import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ProductionTable } from './components/ProductionTable';
import { ProductionChart } from './components/ProductionChart';
import { CameraFeed } from './components/CameraFeed';
import { LineGraph } from './components/LineGraph';
import { ProductionData, ChartData } from './types';
import { ClipboardList } from 'lucide-react';

function App() {
  const [productionData, setProductionData] = useState<ProductionData[]>([]);

  // Sample data for line graphs
  const lineData1 = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * 50) + 50
  }));

  const lineData2 = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * 50) + 50
  }));

  const handleFileUpload = (data: any[]) => {
    const formattedData = data.map(item => ({
      partNumber: item.PartNumber || item['Part Number'] || '',
      partName: item.PartName || item['Part Name'] || '',
      quantity: parseInt(item.Quantity) || 0,
      date: item.Date || '',
      shift: item.Shift || '',
      operator: item.Operator || ''
    }));
    setProductionData(formattedData);
  };

  const getChartData = (): ChartData[] => {
    const aggregatedData = productionData.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.partName] = (acc[curr.partName] || 0) + curr.quantity;
      return acc;
    }, {});

    return Object.entries(aggregatedData).map(([name, quantity]) => ({
      name,
      quantity
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClipboardList className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Production Report Dashboard</h1>
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-2 py-6">
        <div className="grid grid-cols-5 gap-6 h-[calc(100vh-8rem)]">
          <div className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(50%-0.75rem)] mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Part Line 1</h2>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="text-gray-500">Part Number</p>
                  <p className="font-medium text-gray-900">-</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Part Name</p>
                  <p className="font-medium text-gray-900">-</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Total Quantity / Shift</p>
                  <p className="font-medium text-gray-900">0</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Parts / Hour</p>
                  <p className="font-medium text-gray-900">0</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(50%-0.75rem)]">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Part Line 2</h2>
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="text-gray-500">Part Number</p>
                  <p className="font-medium text-gray-900">-</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Part Name</p>
                  <p className="font-medium text-gray-900">-</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Total Quantity / Shift</p>
                  <p className="font-medium text-gray-900">0</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Parts / Hour</p>
                  <p className="font-medium text-gray-900">0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(50%-0.75rem)]">
              <LineGraph title="Line 1 Production Rate" data={lineData1} color="#3B82F6" />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(50%-0.75rem)]">
              <LineGraph title="Line 2 Production Rate" data={lineData2} color="#10B981" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4 flex-[2]">
              <CameraFeed />
            </div>
            {productionData.length > 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-4 flex-1 overflow-hidden">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Production Details</h2>
                <div className="h-[calc(100%-3rem)] overflow-auto">
                  <ProductionTable data={productionData} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-4 flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-xl font-medium mb-2">No production details</p>
                  <p className="text-sm">Upload an Excel file to view the details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;