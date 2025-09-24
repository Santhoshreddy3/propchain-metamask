import React from 'react';
import { User, Wallet, Heart, Search, TrendingUp, Star, Shield } from 'lucide-react';
import { mockUser, mockMarketData } from '../data/mockData';
import { useWallet } from '../context/WalletContext';
import { shortAddress } from '../lib/wallet';
import { ConnectWalletButton } from '../components/ConnectWalletButton';

export const DashboardPage: React.FC = () => {
  const { account } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-blue-50/30 relative overflow-hidden">
      {/* ...background elements... */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Welcome back, {mockUser.name}! Here's your property portfolio overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorite Properties</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.favorites.length}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Searches</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.savedSearches.length}</p>
              </div>
              <Search className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Property Value</p>
                <p className="text-2xl font-bold text-gray-900">{mockMarketData.averagePrice}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wallet Status</p>
                {account ? (
                  <p className="text-sm font-semibold text-emerald-600">
                    <span className="bg-gray-100 px-2 py-1 rounded">{shortAddress(account)}</span>
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-red-600">
                    Disconnected
                  </p>
                )}
              </div>
              <Wallet className={`w-8 h-8 ${account ? 'text-emerald-500' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* ...recent activity and saved searches... */}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Wallet Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-6">
              <h3 className="text-xl font-semibold mb-6">Wallet Connection</h3>
              {account ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 break-all bg-gray-50 p-3 rounded-lg">
                    {account}
                  </div>
                  <button className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg transition-colors">
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-6">
                    <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Connect your wallet to access NFT properties and blockchain features.</p>
                    <ConnectWalletButton />
                  </div>
                </div>
              )}
            </div>
            {/* ...quick actions and market insights... */}
          </div>
        </div>
      </div>
    </div>
  );
}
