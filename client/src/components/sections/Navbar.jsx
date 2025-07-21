"use client"

import React, { useEffect, useRef, useState } from "react"
import { Slack } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const menuRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsMobileMenuOpen(false);
      }, 300); // duration matches your CSS transition
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  const loginHandler = async () => {
    try {
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const signupHandler = async () => {
    try {
      navigate('/signup')
    } catch (error) {
      console.error(error)
    }
  }

  const popupData = {
    product: {
      sections: [
        {
          title: "Core Features",
          items: [
            {
              name: "Plan Events",
              description: "Create and schedule events with intuitive tools and templates",
            },
            {
              name: "Manage Guests",
              description: "Track RSVPs, send invitations, and manage guest lists with ease",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              name: "Vendor Coordination",
              description: "Assign vendors and streamline communication in one place",
            },
            {
              name: "Budget Tracking",
              description: "Monitor spending and stay within your event budget",
            },
            {
              name: "Task Management",
              description: "Assign responsibilities and track progress with your team",
            },
          ],
        },
        {
          title: " ",
          items: [
            {
              name: "Event Templates",
              description: "Use pre-built templates for weddings, corporate events, and more",
            },
            {
              name: "Mobile Access",
              description: "Plan and update your events on the go",
            },
            {
              name: "AI Suggestions",
              description: "Get venue, vendor, and decor recommendations powered by AI",
            },
          ],
        },
      ],
    },
    resources: {
      sections: [
        {
          title: "Guides & Tools",
          items: [
            {
              name: "Getting Started",
              description: "Learn how to set up and run your first event",
            },
            {
              name: "Event Checklist",
              description: "Step-by-step planning checklist to keep you on track",
            },
            {
              name: "Budget Calculator",
              description: "Estimate and allocate your event spending",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              name: "Event Planner Blog",
              description: "Trends, inspiration, and industry tips",
            },
            {
              name: "Planner Forums",
              description: "Ask questions and share experiences with peers",
            },
            {
              name: "Vendor Directory",
              description: "Browse trusted vendors by category and location",
            },
          ],
        },
        {
          title: " ",
          items: [
            {
              name: "Help Center",
              description: "Support articles and troubleshooting resources",
            },
            {
              name: "Templates Library",
              description: "Ready-to-use planning templates for all event types",
            },
            {
              name: "Live Demos",
              description: "Attend walkthroughs of the platform features",
            },
          ],
        },
      ],
    },
    pricing: {
      sections: [
        {
          title: "Plans",
          items: [
            {
              name: "Free",
              description: "Best for trying out basic features and planning simple events",
            },
            {
              name: "Professional",
              description: "Full suite for freelance planners and small teams",
            },
            {
              name: "Agency",
              description: "Designed for large-scale planners with multiple events",
            },
          ],
        },
        {
          title: "Billing",
          items: [
            {
              name: "Cost Estimator",
              description: "Predict pricing based on event size and features",
            },
            {
              name: "Billing Dashboard",
              description: "Manage invoices, plans, and payment methods",
            },
            {
              name: "Payment Options",
              description: "Credit card, PayPal, and bank transfers supported",
            },
          ],
        },
        {
          title: " ",
          items: [
            {
              name: "Add-ons",
              description: "Enhance your plan with premium features and integrations",
            },
            {
              name: "Team Licenses",
              description: "Special rates for event planning teams",
            },
            {
              name: "Contact Sales",
              description: "Discuss custom pricing and white-label solutions",
            },
          ],
        },
      ],
    },
    customers: {
      sections: [
        {
          title: "Event Success",
          items: [
            {
              name: "Case Studies",
              description: "See how planners achieved success with our platform",
            },
            {
              name: "User Testimonials",
              description: "Hear from real planners and clients",
            },
            {
              name: "Spotlight Events",
              description: "Featured stories from high-profile events",
            },
          ],
        },
        {
          title: "Support",
          items: [
            {
              name: "Planner Support",
              description: "Dedicated assistance for organizers and hosts",
            },
            {
              name: "Technical Help",
              description: "Help with platform issues, available 24/7",
            },
            {
              name: "Training",
              description: "Interactive onboarding for you and your team",
            },
          ],
        },
        {
          title: " ",
          items: [
            {
              name: "User Groups",
              description: "Connect with fellow planners through local meetups",
            },
            {
              name: "Webinars & Events",
              description: "Learn and network at live digital and in-person events",
            },
            {
              name: "Partner Program",
              description: "Join our network of event pros and vendors",
            },
          ],
        },
      ],
    },
  };


  const NavigationPopup = ({ isVisible, content, onMouseEnter, onMouseLeave }) => {
    if (!isVisible || !content) return null

    return (
      <div
        className="absolute top-full left-0 mt-2 w-[650px] bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl z-50 p-6"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid grid-cols-3 gap-8">
          {content.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h3 className="text-gray-400 text-xs tracking-wider mb-4">{section.title}</h3>
              )}
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h4 className="text-white text-sm b-1">{item.name}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const NavigationItem = ({ href, children, popupContent }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false)

    const handleMouseEnter = () => {
      if (popupContent) {
        setIsPopupVisible(true)
      }
    }

    const handleMouseLeave = () => {
      setIsPopupVisible(false)
    }

    return (
      <div className="relative">
        <a
          href={href}
          className="text-[#8a8f98] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </a>
        {popupContent && (
          <NavigationPopup
            isVisible={isPopupVisible}
            content={popupContent}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    )
  }


  return (
    <nav className="w-full bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Slack className="w-8 h-8 text-white" />
              <span className="text-white font-medium font-sans text-lg">Fun Planner</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center space-x-6">
            <NavigationItem href="#product" popupContent={popupData.product}>Product</NavigationItem>
            <NavigationItem href="#resources" popupContent={popupData.resources}>Resources</NavigationItem>
            <NavigationItem href="#pricing" popupContent={popupData.pricing}>Pricing</NavigationItem>
            <NavigationItem href="#customers" popupContent={popupData.customers}>Customers</NavigationItem>
            <NavigationItem href="#blog">Blog</NavigationItem>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=omgupta.tech@gmail.com&su=Regarding%20Your%20Full-Stack%20Project&body=Hi%20Om,%0D%0A%0D%0AWe%20recently%20came%20across%20your%20full-stack%20project%20and%20were%20very%20impressed%20by%20the%20quality%20and%20technical%20depth.%0D%0A%0D%0AWe'd%20love%20to%20connect%20and%20discuss%20the%20possibility%20of%20an%20internship%20opportunity%20with%20our%20team.%0D%0A%0D%0APlease%20let%20us%20know%20a%20convenient%20time%20for%20a%20brief%20conversation.%0D%0A%0D%0ALooking%20forward%20to%20hearing%20from%20you.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white block px-3 py-2  font-semibold text-sm  transition-colors duration-200"
            >
              Contact
            </a>

          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium cursor-pointer"
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              onClick={signupHandler}
              className="bg-gray-300 text-gray-900 hover:bg-gray-100 px-4 py-1.5 text-sm font-medium rounded-lg transition cursor-pointer"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white p-2 rounded-md transition"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={menuRef} className="md:hidden mt-2 border-t border-gray-800">
            <div className="px-4 py-4 space-y-2">
              {/* Auth Buttons - Mobile */}
              <button
                className="w-full text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition"
                onClick={() => {
                  loginHandler();
                  setIsMobileMenuOpen(false);
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  signupHandler();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-white text-black hover:bg-gray-100 px-3 py-2 text-base font-medium rounded-md transition"
              >
                Sign up
              </button>

              {/* Navigation Links - Mobile */}
              {[
                { label: 'Product', href: '#product' },
                { label: 'Resources', href: '#resources' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Customers', href: '#customers' },
                { label: 'Blog', href: '#blog' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>

  )
}

export default Navbar
