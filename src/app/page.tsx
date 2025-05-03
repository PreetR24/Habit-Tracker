"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bell, Menu, X, Home, AlertTriangle, Github, Heart, Compass, TrendingUp, Award, Calendar, Target, BarChart2, User, Component, Droplet, Moon, Sun, Activity, Smile, Book, Edit2, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Navbar component
// This component is responsible for rendering the navigation bar at the top of the page
interface NavbarProps {
  openSettings: () => void;
}

const Navbar = ({ openSettings }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Fetch a random user avatar from randomuser.me
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setUserAvatar(data.results[0].picture.medium);
        }
      })
      .catch(error => console.error('Error fetching avatar:', error));
      
    // Add scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`sticky top-0 z-50 bg-white ${scrolled ? 'shadow-md' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        backgroundColor: 'var(--navbar-bg)',
        borderBottom: '1px solid var(--navbar-border)',
        color: 'var(--navbar-text)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <motion.div 
                className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <NavLink icon={<BarChart2 size={20} className="text-white" />} label=''/>
              </motion.div>
            </div>
            <div className="hidden md:block ml-4">
              <div className="flex items-center space-x-4">
                <NavLink icon={<Home size={18} />} label="Home" />
                <NavLink icon={<Compass size={18} />} label="Discover" />
                <NavLink icon={<BarChart2 size={18} />} label="Analytics" />
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-3">              
              <motion.button
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={openSettings}
              >
                <Settings size={20} />
              </motion.button>
              
              {userAvatar ? (
                <motion.img 
                  src={userAvatar} 
                  alt="User avatar" 
                  className="h-8 w-8 rounded-full cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                />
              ) : (
                <motion.div 
                  className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <User size={16} className="text-gray-500" />
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on mobile menu state */}
      <motion.div 
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavLink icon={<Home size={18} />} label="Home" active />
          <MobileNavLink icon={<Compass size={18} />} label="Discover" />
          <MobileNavLink icon={<BarChart2 size={18} />} label="Analytics" />
          <MobileNavLink icon={<Bell size={18} />} label="Notifications" />
          <MobileNavLink icon={<Settings size={18} />} label="Settings" onClick={openSettings} />
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            {userAvatar ? (
              <img src={userAvatar} alt="User avatar" className="h-10 w-10 rounded-full" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={20} className="text-gray-500" />
              </div>
            )}
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Jane Doe</div>
              <div className="text-sm font-medium text-gray-500">jane@example.com</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavLink = ({ icon, label, active = false }: NavLinkProps) =>{
  const href = `#${label.toLowerCase()}`;
  return (
  <motion.a
    href={href}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
      ${
      active 
      ? 'bg-violet-500 text-indigo-700' 
      : 'text-gray-600 hover:text-gray-900'
    }
    `
  }
    style={{ color: 'var(--navbar-text)' }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </motion.a>
);
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink = ({ icon, label, active = false, onClick }: MobileNavLinkProps) => (
  <motion.a
    href="#"
    onClick={onClick}
    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
      active 
        ? 'bg-indigo-100 text-indigo-700' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
    whileHover={{ scale: 3.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="mr-3 cursor-pointer">{icon}</span>
    {label}
  </motion.a>
);

// ReminderBanner Component
// This component is responsible for rendering the reminder banner
interface ReminderBannerProps {
  missedHabits: (Habit | undefined)[];
}

const ReminderBanner = ({ missedHabits }: ReminderBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [randomAvatar, setRandomAvatar] = useState('');
  
  useEffect(() => {
    // Fetch a random user avatar from randomuser.me
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setRandomAvatar(data.results[0].picture.medium);
        }
      })
      .catch(error => console.error('Error fetching avatar:', error));
  }, []);

  if (!isVisible || !missedHabits.length) return null;

  const validHabits = missedHabits.filter(habit => habit !== undefined) as Habit[];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0">
                {randomAvatar ? (
                  <img 
                    src={randomAvatar} 
                    alt="User avatar" 
                    className="w-12 h-12 rounded-full border-2 border-amber-500"
                  />
                ) : (
                  <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                    <AlertTriangle size={24} className="text-amber-600" />
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-amber-800">Reminder!</h3>
                <p className="text-amber-700">
                  {validHabits.length === 1 
                    ? `You haven't checked in with "${validHabits[0].name}" today.` 
                    : `You missed ${validHabits.length} habits today: ${validHabits.map(h => `"${h.name}"`).join(', ')}.`
                  }
                </p>
                <motion.button
                  className="text-amber-800 font-medium text-sm mt-1 hover:underline cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.location.href = '/#discover';
                  }}
                >
                  Check them now
                </motion.button>
              </div>
            </div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="text-amber-700 hover:text-amber-900 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// HabitTracker Component
// This component is responsible for rendering the main content of the page
interface Habit {
  id: number;
  name: string;
  streak: number;
  goal: number;
  lastChecked: boolean;
  icon: string;
  color: string;
  category: string;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [missedHabits, setMissedHabits] = useState<number[]>([]);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    // Enhanced habit data with icons, colors and categories
    setHabits([
      { 
        id: 1, 
        name: "Drink Water", 
        streak: 5, 
        goal: 8, 
        lastChecked: false,
        icon: "droplet",
        color: "#3B82F6", // blue
        category: "Health"
      },
      { 
        id: 2, 
        name: "Sleep", 
        streak: 3, 
        goal: 7, 
        lastChecked: false,
        icon: "moon",
        color: "#8B5CF6", // purple
        category: "Rest"
      },
      { 
        id: 3, 
        name: "Exercise", 
        streak: 0, 
        goal: 30, 
        lastChecked: false,
        icon: "activity",
        color: "#EF4444", // red
        category: "Fitness"
      },
      { 
        id: 4, 
        name: "Meditation", 
        streak: 8, 
        goal: 10, 
        lastChecked: true,
        icon: "smile",
        color: "#10B981", // green
        category: "Wellness"
      },
      { 
        id: 5, 
        name: "Reading", 
        streak: 2, 
        goal: 20, 
        lastChecked: false,
        icon: "book",
        color: "#F59E0B", // amber
        category: "Learning"
      }
    ]);
    setMissedHabits([1, 3]);
  }, []);

  const handleCheckIn = (habitName: string) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.name === habitName
          ? { ...habit, streak: habit.streak + 1, lastChecked: true }
          : habit
      )
    );
    
    // Remove from missed habits if checked in
    setMissedHabits(prev => 
      prev.filter(id => {
        const habit = habits.find(h => h.id === id);
        return habit && habit.name !== habitName;
      })
    );
  };

  const handleGoalChange = (habitName: string, newGoal: string) => {
    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal)) {
      setHabits(prev =>
        prev.map(habit =>
          habit.name === habitName
            ? { ...habit, goal: parsedGoal }
            : habit
        )
      );
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredHabits = selectedCategory === "All" 
    ? habits 
    : habits.filter(habit => habit.category === selectedCategory);

  const categories = ["All", ...Array.from(new Set(habits.map(habit => habit.category)))];

  // HabitCard component
  // This component is responsible for rendering individual habit cards
  interface HabitCardProps {
    name: string;
    progress: number;
    streak: number;
    goal: string;
    onCheckIn: (name: string) => void;
    onGoalChange: (name: string, goal: string) => void;
    icon: string;
    color: string;
    category: string;
  }

  const HabitCard = ({ 
    name, 
    progress, 
    streak, 
    goal, 
    onCheckIn, 
    onGoalChange,
    icon,
    color,
    category
  }: HabitCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newGoal, setNewGoal] = useState(goal);
    const [isChecking, setIsChecking] = useState(false);

    const handleGoalSubmit = () => {
      onGoalChange(name, newGoal);
      setIsEditing(false);
    };

    const handleCheckIn = () => {
      setIsChecking(true);
      setTimeout(() => {
        onCheckIn(name);
        setIsChecking(false);
      }, 600);
    };

    const renderIcon = () => {
      const iconProps = { size: 24, color: color };
      
      switch(icon) {
        case 'droplet':
          return <Droplet {...iconProps} />;
        case 'moon':
          return <Moon {...iconProps} />;
        case 'activity':
          return <Activity {...iconProps} />;
        case 'smile':
          return <Smile {...iconProps} />;
        case 'book':
          return <Book {...iconProps} />;
        default:
          return <Droplet {...iconProps} />;
      }
    };

    const progressVariants = {
      initial: { width: 0 },
      animate: { 
        width: `${progress}%`, 
        transition: { duration: 0.8, ease: "easeOut" } 
      }
    };

    const checkInVariants = {
      initial: { scale: 1 },
      checking: { scale: 1.2, transition: { duration: 0.2 } },
      checked: { scale: 1, transition: { duration: 0.2 } }
    };

    return (
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        style={{ 
          backgroundColor: 'var(--card-bg)',
          color: 'var(--primary-text)',
          boxShadow: '0 4px 6px var(--shadow-color)'
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
                {renderIcon()}
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--primary-text)' }}>{name}</h3>
                <span className="text-xs text-gray-500" style={{ color: 'var(--secondary-text)' }}>{category}</span>
              </div>
            </div>
            
            <motion.button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
              whileTap={{ scale: 0.95 }}
              style={{ 
                backgroundColor: 'var(--secondary-bg)',
                color: 'var(--primary-text)'
              }}
              onClick={handleCheckIn}
              disabled={isChecking}
              animate={isChecking ? "checking" : "initial"}
              variants={checkInVariants}
            >
              {isChecking ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6, repeat: 1 }}
                >
                  <Check size={18} color={color} />
                </motion.div>
              ) : (
                <Check size={18} color={color} />
              )}
            </motion.button>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm" style={{ color: 'var(--secondary-text)' }}>Progress</span>
              <span className="text-sm font-medium" style={{ color: 'var(--primary-text)' }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--secondary-bg)' }}>
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm" style={{ color: 'var(--secondary-text)' }}>Current streak</span>
              <div className="font-bold text-lg" style={{ color: 'var(--primary-text)' }}>{streak} days</div>
            </div>
            
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600" style={{ color: 'var(--secondary-text)' }}>Goal</span>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} style={{ color: 'var(--secondary-text)' }} className="text-gray-400 hover:text-gray-600 ml-3 cursor-pointer">
                    <Edit2 size={12} />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="w-16 border rounded p-1 text-sm"
                    style={{ 
                      backgroundColor: 'var(--secondary-bg)',
                      color: 'var(--primary-text)',
                      border: '1px solid var(--border-color)'
                    }}
                    autoFocus
                  />
                  <button onClick={handleGoalSubmit} style={{ color: 'var(--success-color)' }} className="hover:opacity-80 cursor-pointer">
                    <Check size={16} />
                  </button>
                  <button onClick={() => setIsEditing(false)} style={{ color: 'var(--error-color)' }} className="hover:opacity-80 cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="font-bold text-lg" style={{ color: 'var(--primary-text)' }}>{goal} days</div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderHabitCard = (habit: Habit) => {
    const progress = Math.min(Math.floor((habit.streak / habit.goal) * 100), 100);
    return (
      <motion.div
        key={habit.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        layout
      >
        <HabitCard
          name={habit.name}
          progress={progress}
          streak={habit.streak}
          goal={habit.goal.toString()}
          onCheckIn={handleCheckIn}
          onGoalChange={handleGoalChange}
          icon={habit.icon}
          color={habit.color}
          category={habit.category}
        />
      </motion.div>
    );
  };

  const chartData = habits.map(habit => ({
    name: habit.name,
    streak: habit.streak,
    goal: habit.goal,
    color: habit.color
  }));

  // HabitProgressChart component
  // This component is responsible for rendering the habit progress chart
  interface ChartData {
    name: string;
    streak: number;
    goal: number;
    color: string;
  }
  
  interface HabitProgressChartProps {
    data: ChartData[];
  }
  
  const HabitProgressChart = ({ data }: HabitProgressChartProps) => {
    const [chartType, setChartType] = useState<'bar' | 'pie' | 'radar'>('bar');
    
    // Calculate completion percentages for pie chart
    const pieData = data.map(item => ({
      name: item.name,
      value: Math.min((item.streak / item.goal) * 100, 100),
      color: item.color
    }));
    
    // Calculate total stats
    const totalStreak = data.reduce((sum, item) => sum + item.streak, 0);
    const averageCompletion = data.length 
      ? data.reduce((sum, item) => sum + Math.min((item.streak / item.goal) * 100, 100), 0) / data.length
      : 0;
    
    // Format data for radar chart
    const radarData = data.map(item => ({
      subject: item.name,
      A: Math.min((item.streak / item.goal) * 100, 100),
      fullMark: 100,
      color: item.color
    }));
  
    const renderChart = (): React.ReactElement => {
      if (chartType === 'bar') {
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                `${value} days`,
                name === 'streak' ? 'Current Streak' : 'Goal',
              ]}
            />
            <Legend />
            <Bar dataKey="streak" name="Current Streak" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Bar dataKey="goal" name="Goal" radius={[4, 4, 0, 0]} fill="#cbd5e1" />
          </BarChart>
        );
      }
    
      if (chartType === 'pie') {
        return (
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
            <Legend />
          </PieChart>
        );
      }
    
      if (chartType === 'radar') {
        return (
          <RadarChart outerRadius={90} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Radar
              name="Completion Rate"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip formatter={(value) => `${Number(value).toFixed(0)}%`} />
            <Legend />
          </RadarChart>
        );
      }
    
      return <></>;
    };  
  
    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold mb-1">Habit Progress Stats</h2>
            <div className="flex gap-4">
              <div className="text-sm">
                <span className="text-gray-500">Total Streak Days:</span> 
                <span className="font-bold ml-1">{totalStreak}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Average Completion:</span> 
                <span className="font-bold ml-1">{averageCompletion.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <ChartButton 
              active={chartType === 'bar'} 
              onClick={() => setChartType('bar')}
              label="Bar"
            />
            <ChartButton 
              active={chartType === 'pie'} 
              onClick={() => setChartType('pie')}
              label="Pie" 
            />
            <ChartButton 
              active={chartType === 'radar'} 
              onClick={() => setChartType('radar')}
              label="Radar" 
            />
          </div>
        </div>
        
        <div className="h-80">
          <motion.div
            key={chartType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    );
  };
  
  interface ChartButtonProps {
    active: boolean;
    onClick: () => void;
    label: string;
  }
  
  const ChartButton = ({ active, onClick, label }: ChartButtonProps) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
        active 
          ? 'bg-indigo-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </motion.button>
  ); 

  // HabitStats Component
  // This component is responsible for rendering the habit statistics
  interface HabitStatsProps {
    habits: Habit[];
  }
  
  const HabitStats = ({ habits }: HabitStatsProps) => {
    // Generate mock historical data for the line chart
    const generateHistoricalData = () => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map(day => {
        const dayData: { [key: string]: any } = { name: day };
        habits.forEach(habit => {
          // Generate some random historical completion values between 0-100%
          dayData[habit.name] = Math.floor(Math.random() * 100);
        });
        return dayData;
      });
    };
  
    const historicalData = generateHistoricalData();
    
    // Calculate various stats
    const totalHabits = habits.length;
    const completedToday = habits.filter(h => h.lastChecked).length;
    const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
    const longestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
    const bestPerformer = habits.reduce((best, h) => 
      h.streak > (best?.streak || 0) ? h : best, habits[0]);
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    };
  
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { duration: 0.4 }
      }
    };
  
    return (
      <motion.div 
        className="rounded-xl shadow-md p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          color: 'var(--primary-text)',
          boxShadow: '0 4px 6px var(--shadow-color)'
        }}
      >
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--primary-text)' }}>Weekly Habit Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Habits"
            value={totalHabits.toString()}
            icon={<Target size={20} style={{ color: 'var(--chart-color-1)' }}/>}
            variants={itemVariants}
          />
          
          <StatCard 
            title="Today's Completion"
            value={`${completionRate.toFixed(0)}%`}
            icon={<Calendar size={20} style={{ color: 'var(--chart-color-2)' }} />}
            variants={itemVariants}
          />
          
          <StatCard 
            title="Longest Streak"
            value={`${longestStreak} days`}
            icon={<TrendingUp size={20} style={{ color: 'var(--chart-color-3)' }} />}
            variants={itemVariants}
          />
          
          <StatCard 
            title="Best Performer"
            value={bestPerformer?.name || "None"}
            icon={<Award size={20} style={{ color: 'var(--chart-color-4)' }} />}
            variants={itemVariants}
          />
        </div>
  
        <motion.div
          variants={itemVariants}
          className="h-70"
          style={{ color: 'var(--primary-text)' }}
        >
          <h3 className="text-lg font-semibold" style={{ color: 'var(--primary-text)' }}>
            Weekly Performance
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart 
              data={historicalData}
              style={{ color: 'var(--primary-text)' }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)"/>
              <XAxis 
                dataKey="name" 
                stroke="var(--graph-text)"
                style={{ color: 'var(--graph-text)' }}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`} 
                stroke="var(--graph-text)"
                style={{ color: 'var(--graph-text)' }}
              />
              <Tooltip 
                formatter={(value) => `${value}%`} 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--primary-text)'
                }}
                labelStyle={{ color: 'var(--primary-text)' }}
                itemStyle={{ color: 'var(--primary-text)' }}
              />
              <Legend 
                wrapperStyle={{
                  color: 'var(--primary-text)'
                }}
              />
              {habits.map((habit, index) => (
                <Line
                  key={habit.id}
                  type="monotone"
                  dataKey={habit.name}
                  stroke={habit.color || `var(--chart-color-${(index % 4) + 1})`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    );
  };
  
  interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    variants: any;
  }
  
  const StatCard = ({ title, value, icon, variants }: StatCardProps) => (
    <motion.div 
      className="p-4 rounded-lg"
      variants={variants}
      style={{ 
        backgroundColor: 'var(--secondary-bg)',
        color: 'var(--primary-text)'
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div 
          className="p-2 rounded-full shadow-sm" 
          style={{ 
            backgroundColor: 'var(--card-bg)',
            boxShadow: '0 2px 4px var(--shadow-color)'
          }}
        >
          {icon}
        </div>
        <h3 
          className="text-sm font-medium"
          style={{ color: 'var(--secondary-text)' }}
        >
          {title}
        </h3>
      </div>
      <p 
        className="text-2xl font-bold"
        style={{ color: 'var(--primary-text)' }}
      >
        {value}
      </p>
    </motion.div>
  );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {missedHabits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ReminderBanner 
            missedHabits={missedHabits.map(id => habits.find(h => h.id === id))} 
          />
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-6"
         id='discover'
      >
        <h1 className="text-3xl font-bold">Your Habits</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {showStats ? "Hide Stats" : "Show Stats"}
          </button>
        </div>
      </motion.div>

      {/* Category filter */}
      <motion.div 
        className="mb-6 flex gap-2 overflow-x-auto pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <HabitStats habits={habits} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnimatePresence>
          {filteredHabits.map(renderHabitCard)}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 bg-white p-6 rounded-xl shadow-md"
        id="analytics"
        style={{ 
          backgroundColor: 'var(--graph-bg)',
          color: 'var(--graph-text)'
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Progress Overview</h2>
        <HabitProgressChart data={chartData}/>
      </motion.div>
    </div>
  );
};

// SettingsModal Component
// This component is responsible for rendering the settings modal
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDarkMode: boolean;
  onChange: (darkMode: boolean) => void;
}

const SettingsModal = ({ isOpen, onChange, onClose, initialDarkMode }: SettingsModalProps) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    // Only update the darkMode on the client side
    if (typeof window !== "undefined") {
      setDarkMode(initialDarkMode);
    }
  }, [initialDarkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      onChange(newMode); // This will be triggered after render
      return newMode;
    });
  };

  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            className="fixed inset-0 bg-opacity-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <div className="flex items-center justify-center min-h-screen px-4 backdrop-blur-sm bg-white/30">
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-sm w-full mx-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
            >
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {darkMode ? (
                      <Moon size={20} className="text-indigo-600" />
                    ) : (
                      <Sun size={20} className="text-amber-500" />
                    )}
                    <span className="ml-3 text-gray-700">Dark Mode</span>
                  </div>
                  <Toggle enabled={darkMode} onChange={handleDarkModeToggle} />
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-xl">
                <motion.button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface ToggleProps {
  enabled: boolean;
  onChange: (newState: boolean) => void;
}

const Toggle = ({ enabled, onChange }: ToggleProps) => (
  <button
    type="button"
    className={`${
      enabled ? "bg-indigo-600" : "bg-gray-200"
    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
    onClick={() => onChange(!enabled)}
  >
    <span
      className={`${
        enabled ? "translate-x-6" : "translate-x-1"
      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
    />
  </button>
);  

// Footer Component
// This component is responsible for rendering the footer
const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--footer-bg)',
      color: 'var(--footer-text)',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="h-8 w-8 rounded-lg flex items-center justify-center mr-2"
                whileHover={{ rotate: 10 }}
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <Heart size={20} className="text-white" />
              </motion.div>
              <span className="text-lg font-bold" style={{ color: 'var(--primary-text)' }}>HabitMaster</span>
            </motion.div>
            <p className="text-sm mt-1" style={{ color: 'var(--secondary-text)' }}>
              Track your habits, achieve your goals.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-2">
              <SocialLink icon={<Github size={18} />} href="https://github.com/PreetR24/Habit-Tracker" />
            </div>
            <p className="text-sm" style={{ color: 'var(--secondary-text)' }}>
              © {new Date().getFullYear()} HabitMaster. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink = ({ icon, href }: SocialLinkProps) => (
  <motion.a
    href={href}
    className="p-2 rounded-full flex items-center justify-center"
    whileTap={{ scale: 0.9 }}
    style={{ 
      backgroundColor: 'var(--filter-bg)',
      color: 'var(--secondary-text)',
      transition: 'all 0.2s ease-in-out'
    }}
    whileHover={{
      scale: 1.1,
      backgroundColor: 'var(--accent-color)',
      color: 'white'
    }}
  >
    {icon}
  </motion.a>
);

const Page = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Function to open the modal
  const openSettings = () => setIsSettingsOpen(true);

  // Function to close the modal
  const closeSettings = () => setIsSettingsOpen(false);
  
  // Enhanced loading animation with steps
  useEffect(() => {
    if (isLoading) {
      const stepTimers = [
        setTimeout(() => setAnimationStep(1), 500),
        setTimeout(() => setAnimationStep(2), 1200),
        setTimeout(() => setAnimationStep(3), 1900),
        setTimeout(() => {
          setAnimationStep(4);
          setTimeout(() => setIsLoading(false), 600);
        }, 2600)
      ];
      
      return () => stepTimers.forEach(timer => clearTimeout(timer));
    }
  }, [isLoading]);

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
  };

  useEffect(() => {
    // Apply dark mode to the document using classList.toggle
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Apply theme colors to various elements for comprehensive dark mode
    const darkThemeColors = {
      '--primary-bg': isDarkMode ? '#040030' : '#ffffff',
      '--secondary-bg': isDarkMode ? '#1e1e1e' : '#f8f9fa',
      '--primary-text': isDarkMode ? '#ffffff' : '#000000',
      '--secondary-text': isDarkMode ? '#a0a0a0' : '#6c757d',
      '--accent-color': isDarkMode ? '#bb86fc' : '#6246ea',
      '--card-bg': isDarkMode ? '#2d2d2d' : '#ffffff',
      '--border-color': isDarkMode ? '#444444' : '#e0e0e0',
      '--shadow-color': isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)',
      '--success-color': isDarkMode ? '#4caf7d' : '#2e7d32',
      '--error-color': isDarkMode ? '#cf6679' : '#d32f2f',
      '--chart-color-1': isDarkMode ? '#bb86fc' : '#4285F4',
      '--chart-color-2': isDarkMode ? '#03dac6' : '#34A853',
      '--chart-color-3': isDarkMode ? '#cf6679' : '#EA4335',
      '--chart-color-4': isDarkMode ? '#ffab70' : '#FBBC05',
      
      // New component-specific theme variables
      '--navbar-bg': isDarkMode ? '#1a1a1a' : '#ffffff',
      '--navbar-text': isDarkMode ? '#ffffff' : '#333333',
      '--navbar-border': isDarkMode ? '#333333' : '#eaeaea',
      '--footer-bg': isDarkMode ? '#1a1a1a' : '#f5f5f5',
      '--footer-text': isDarkMode ? '#a0a0a0' : '#666666',
      '--filter-bg': isDarkMode ? '#252525' : '#f0f2f5',
      '--filter-active': isDarkMode ? '#3a3a3a' : '#e6e8eb',
      '--filter-text': isDarkMode ? '#e0e0e0' : '#333333',
      '--habit-card-bg': isDarkMode ? '#2a2a2a' : '#ffffff',
      '--habit-card-border': isDarkMode ? '#383838' : '#eaeaea',
      '--habit-completed': isDarkMode ? '#2e3b2f' : '#e6f4ea',
      '--habit-incomplete': isDarkMode ? '#3b2e2e' : '#fdeded',
      '--graph-bg': isDarkMode ? '#1e1e1e' : '#ffffff',
      '--graph-grid': isDarkMode ? '#333333' : '#e0e0e0',
      '--graph-text': isDarkMode ? '#a0a0a0' : '#666666',
      '--modal-bg': isDarkMode ? '#242424' : '#ffffff',
      '--modal-overlay': isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
    };
    
    // Apply CSS variables to root element
    Object.entries(darkThemeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    
    // Apply app-wide theme class for components that use Tailwind
    if (isDarkMode) {
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
  }, [isDarkMode]);

  // Animation variants for the home icon
  const homeIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  // Animation variants for the habit dots
  const habitDotsVariants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: { delay: 0.1 * index, duration: 0.3 }
    })
  };

  // Animation variants for the connection lines
  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 0.8, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  // Animation variants for the graph
  const graphVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--primary-bg)' }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-indigo-600 flex items-center justify-center z-50"
            style={{ 
              backgroundColor: isDarkMode ? '#34257d' : '#6246ea' 
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 w-64">
              {/* Home Icon */}
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                variants={homeIconVariants}
                initial="hidden"
                animate={animationStep >= 1 ? "visible" : "hidden"}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </motion.div>

              {/* Habit Dots around the house */}
              {[0, 1, 2, 3, 4].map((_, i) => (
                <motion.div
                  key={`habit-dot-${i}`}
                  className="absolute w-4 h-4 bg-green-400 rounded-full"
                  style={{
                    left: `${50 + 35 * Math.cos((2 * Math.PI * i) / 5)}%`,
                    top: `${50 + 35 * Math.sin((2 * Math.PI * i) / 5)}%`,
                  }}
                  custom={i}
                  variants={habitDotsVariants}
                  initial="hidden"
                  animate={animationStep >= 2 ? "visible" : "hidden"}
                />
              ))}

              {/* SVG for connections */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {animationStep >= 3 && [0, 1, 2, 3, 4].map((_, i) => (
                  <motion.path
                    key={`connection-${i}`}
                    d={`M 50 50 L ${50 + 35 * Math.cos((2 * Math.PI * i) / 5)} ${50 + 35 * Math.sin((2 * Math.PI * i) / 5)}`}
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    variants={connectionVariants}
                    initial="hidden"
                    animate="visible"
                  />
                ))}
              </svg>

              {/* Analytics Graph */}
              <motion.div
                className="absolute right-0 bottom-0 transform -translate-x-1/4 translate-y-1/4"
                variants={graphVariants}
                initial="hidden"
                animate={animationStep >= 4 ? "visible" : "hidden"}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </motion.div>
            </div>

            <motion.div 
              className="absolute bottom-16 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-white mb-2">HabitMaster</h1>
              <motion.div 
                className="flex space-x-2 text-white text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animationStep * 0.5, duration: 0.5 }}
              >
                {animationStep >= 1 && (
                  <span className="px-2 py-1 bg-indigo-700 rounded-md">Home</span>
                )}
                {animationStep >= 2 && (
                  <motion.span 
                    className="px-2 py-1 bg-green-600 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Habits
                  </motion.span>
                )}
                {animationStep >= 3 && (
                  <motion.span 
                    className="px-2 py-1 bg-purple-600 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Discover
                  </motion.span>
                )}
                {animationStep >= 4 && (
                  <motion.span 
                    className="px-2 py-1 bg-blue-600 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Analytics
                  </motion.span>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen"
        style={{ backgroundColor: 'var(--primary-bg)', color: 'var(--primary-text)' }}
      >
        {/* Navbar with openSettings passed as a prop */}
        <Navbar openSettings={openSettings} />
        
        {/* Main Habit Tracker Section */}
        <main className="flex-grow">
          <HabitTracker />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Settings Modal */}
        <SettingsModal onChange={handleDarkModeToggle} initialDarkMode={isDarkMode} isOpen={isSettingsOpen} onClose={closeSettings} />
      </motion.div>
    </div>
  );
};

export default Page;