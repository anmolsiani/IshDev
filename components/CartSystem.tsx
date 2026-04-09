'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import emailjs from '@emailjs/browser'

// ─── Types ──────────────────────────────────────────────────
interface CartItem {
  id: number
  name: string
  price: number
  pkg?: string
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (name: string, price: number, pkg?: string) => void
  removeItem: (id: number) => void
  openCart: () => void
  closeCart: () => void
  total: number
}

// ─── Context ────────────────────────────────────────────────
const CartContext = createContext<CartContextType | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}

// ─── EmailJS Config — Replace with your keys ────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // 🔴 Replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // 🔴 Replace
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // 🔴 Replace

// ─── Provider ───────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [items,  setItems]  = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ishdev_cart')
    if (saved) setItems(JSON.parse(saved))
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ishdev_cart', JSON.stringify(items))
  }, [items])

  const addItem = (name: string, price: number, pkg = 'Standard') => {
    if (items.find(i => i.name === name)) {
      showToast(`${name} already in cart!`, 'warning')
      return
    }
    setItems(prev => [...prev, { id: Date.now(), name, price, pkg }])
    showToast(`✅ ${name} added!`, 'success')
    setTimeout(() => setIsOpen(true), 400)
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
    showToast('Item removed', 'warning')
  }

  const total = items.reduce((sum, i) => sum + i.price, 0)

  return (
    <CartContext.Provider value={{
      items, isOpen, addItem, removeItem,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      total,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// ─── Toast Helper ────────────────────────────────────────────
function showToast(msg: string, type: 'success' | 'error' | 'warning') {
  let toast = document.getElementById('ishdev-toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'ishdev-toast'
    toast.className = 'toast-notification'
    document.body.appendChild(toast)
  }

  toast.textContent = msg
  toast.className = `toast-notification toast-${type}`

  requestAnimationFrame(() => {
    ;(toast as HTMLElement).classList.add('show')
  })

  setTimeout(() => {
    ;(toast as HTMLElement).classList.remove('show')
  }, 3500)
}

// ─── Cart Sidebar Component ──────────────────────────────────
export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, total } = useCart()
  const [name,  setName]  = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [msg,   setMsg]   = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      showToast('Please fill all required fields!', 'error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Invalid email address!', 'error')
      return
    }
    if (items.length === 0) {
      showToast('Your cart is empty!', 'error')
      return
    }

    setSending(true)

    const servicesList = items.map(i => `• ${i.name} — $${i.price}`).join('\n')
    const timestamp    = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email:   'admin@ishdev.com',
        from_name:  name,
        from_email: email,
        from_phone: phone,
        services:   servicesList,
        total:      `$${total}`,
        message:    msg || 'No additional message.',
        date:       timestamp,
      })

      showToast('🎉 Enquiry sent! We\'ll reply within 24hrs.', 'success')

      // Clear
      localStorage.removeItem('ishdev_cart')
      setName(''); setEmail(''); setPhone(''); setMsg('')
      setTimeout(closeCart, 2500)

    } catch (err) {
      console.error(err)
      showToast('Failed! Email us at admin@ishdev.com', 'error')
    } finally {
      setSending(false)
    }
  }

  const inputClass = `
    w-full px-4 py-3 mb-3 rounded-xl text-sm font-poppins
    bg-white/5 border border-white/10 text-white
    placeholder:text-white/25 outline-none
    focus:border-red-500 focus:bg-red-500/5
    transition-all duration-300
  `

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h3 className="font-oxanium text-white text-lg tracking-widest">
            YOUR CART
          </h3>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/15
                       text-white flex items-center justify-center
                       hover:bg-red-500 hover:border-red-500 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <span className="text-5xl">🛒</span>
              <p className="font-poppins text-white/50">Your cart is empty</p>
              <p className="font-dot text-white/25 text-sm tracking-widest">
                ADD SERVICES TO GET STARTED ↑
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4
                             bg-white/5 border border-white/8 rounded-xl
                             animate-[itemSlide_0.4s_ease]"
                >
                  <div>
                    <p className="font-oxanium text-white text-sm font-semibold">
                      {item.name}
                    </p>
                    <p className="font-dot text-white/35 text-xs tracking-widest mt-1">
                      SERVICE PACKAGE
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-oxanium text-red-500 font-bold text-base">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-full bg-red-500/15 border border-red-500/25
                                 text-red-500 flex items-center justify-center text-xs
                                 hover:bg-red-500 hover:text-white transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer form */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10">
            <h4 className="font-oxanium text-white/60 text-sm tracking-widest mb-4">
              YOUR DETAILS
            </h4>

            <input
              className={inputClass}
              placeholder="Your Name *"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              className={inputClass}
              placeholder="Your Email *"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="tel"
              className={inputClass}
              placeholder="Your Phone *"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Tell us about your project..."
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />

            {/* Total */}
            <div className="flex justify-between items-center py-4 
                            border-y border-white/8 my-4">
              <span className="font-poppins text-white/60 text-sm">
                Estimated Total:
              </span>
              <span className="font-oxanium text-red-500 text-2xl font-black">
                ${total}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full py-4 rounded-xl font-oxanium text-sm font-semibold
                         tracking-wider bg-red-500/10 border-2 border-red-500
                         text-red-500 hover:bg-red-500/20 hover:shadow-lg
                         hover:shadow-red-500/20 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:scale-[1.02] active:scale-[0.98]"
            >
              {sending ? 'SENDING... ⏳' : '📧 SEND ENQUIRY TO ISHDEV'}
            </button>

            <p className="font-poppins text-white/25 text-xs text-center mt-3">
              * Final pricing discussed after free consultation
            </p>
          </div>
        )}
      </aside>
    </>
  )
}

// ─── Cart Button (for Navbar) ────────────────────────────────
export function CartButton() {
  const { items, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      className="relative w-11 h-11 rounded-full bg-black/8 border border-black/15
                 flex items-center justify-center text-black
                 hover:bg-red-500 hover:border-red-500 hover:text-white
                 transition-all duration-300 hover:scale-110"
    >
      <svg width="18" height="18" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>

      {items.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white
                         rounded-full text-[10px] font-oxanium font-bold
                         flex items-center justify-center cart-badge-pulse">
          {items.length}
        </span>
      )}
    </button>
  )
}
