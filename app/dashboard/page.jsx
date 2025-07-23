import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

function Dashboard() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Header Section */}
      <div className='bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
              </svg>
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
              <p className='text-sm text-gray-500'>Manage your interview practice</p>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='hidden md:flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              Online
            </div>
            <UserButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Welcome Section */}
        <div className='mb-8'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12'></div>
            <div className='relative z-10'>
              <h2 className='text-2xl font-bold mb-2'>
                Ready to ace your next interview? 🚀
              </h2>
              <p className='text-blue-100 mb-4'>
                Create and start your AI-powered mock interviews. Practice makes perfect!
              </p>
              <div className='flex flex-wrap gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                  AI-Powered Questions
                </div>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                  Instant Feedback
                </div>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                  Progress Tracking
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4' />
                </svg>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-800'>0</p>
                <p className='text-sm text-gray-500'>Total Interviews</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-800'>0</p>
                <p className='text-sm text-gray-500'>Completed</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
                </svg>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-800'>0%</p>
                <p className='text-sm text-gray-500'>Avg. Score</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-800'>0m</p>
                <p className='text-sm text-gray-500'>Practice Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Section */}
        <div>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-gray-800 mb-1'>Interview Sessions</h3>
              <p className='text-gray-500'>Create new mock interviews or continue existing ones</p>
            </div>
            <div className='flex items-center gap-3'>
              <button className='px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                </svg>
                Filter
              </button>
              <button className='px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* Interview Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AddNewInterview />
            
            {/* Empty State Cards */}
            <div className='bg-white/50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors duration-200'>
              <div className='w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
              <p className='text-gray-500 font-medium mb-2'>No interviews yet</p>
              <p className='text-sm text-gray-400'>Create your first mock interview to get started</p>
            </div>

            <div className='bg-white/50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors duration-200'>
              <div className='w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2zM9 15v-2a2 2 0 114 0v2a2 2 0 11-4 0z' />
                </svg>
              </div>
              <p className='text-gray-500 font-medium mb-2'>More coming soon</p>
              <p className='text-sm text-gray-400'>Practice different interview scenarios</p>
            </div>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className='mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0'>
              <svg className='w-6 h-6 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
              </svg>
            </div>
            <div>
              <h4 className='font-bold text-gray-800 mb-2'>💡 Pro Tips for Better Interviews</h4>
              <ul className='text-sm text-gray-600 space-y-1'>
                <li>• Practice regularly to build confidence and improve your responses</li>
                <li>• Review your recorded sessions to identify areas for improvement</li>
                <li>• Focus on the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard