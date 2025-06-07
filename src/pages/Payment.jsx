"use client"

import { useState } from "react"

const paymentOptions = [
  { id: "card", label: "Credit/Debit Card", icon: "💳" },
  { id: "upi", label: "UPI", icon: "📲" },
  { id: "phonepay", label: "PhonePe", icon: "📱" },
  { id: "googlepay", label: "Google Pay", icon: "🟢" },
  { id: "paytm", label: "Paytm", icon: "🔵" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
]

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState("")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  })
  const [upiId, setUpiId] = useState("")
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("")

  // Card validation functions
  const validateCardNumber = (number) => {
    const digits = number.replace(/\D/g, "")
    let sum = 0
    let isEven = false

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(digits[i])
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0 && digits.length >= 13
  }

  const getCardType = (number) => {
    const digits = number.replace(/\D/g, "")
    if (digits.startsWith("4")) return "Visa"
    if (digits.startsWith("5") || digits.startsWith("2")) return "MasterCard"
    if (digits.startsWith("3")) return "American Express"
    return ""
  }

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "")
    const groups = digits.match(/.{1,4}/g) || []
    return groups.join(" ").substr(0, 19)
  }

  const validateUPI = (upiId) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
    return upiRegex.test(upiId)
  }

  const handleCardInputChange = (field, value) => {
    let formattedValue = value

    if (field === "number") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substr(0, 5)
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substr(0, 4)
    }

    setCardDetails((prev) => ({ ...prev, [field]: formattedValue }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (selectedOption === "card") {
      if (!cardDetails.number) {
        newErrors.number = "Card number is required"
      } else if (!validateCardNumber(cardDetails.number)) {
        newErrors.number = "Invalid card number"
      }

      if (!cardDetails.name) {
        newErrors.name = "Cardholder name is required"
      }

      if (!cardDetails.expiry) {
        newErrors.expiry = "Expiry date is required"
      } else {
        const [month, year] = cardDetails.expiry.split("/")
        const currentDate = new Date()
        const expiryDate = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
        if (expiryDate < currentDate) {
          newErrors.expiry = "Card has expired"
        }
      }

      if (!cardDetails.cvv) {
        newErrors.cvv = "CVV is required"
      } else if (cardDetails.cvv.length < 3) {
        newErrors.cvv = "CVV must be 3-4 digits"
      }
    } else if (selectedOption === "upi") {
      if (!upiId) {
        newErrors.upi = "UPI ID is required"
      } else if (!validateUPI(upiId)) {
        newErrors.upi = "Invalid UPI ID format"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!selectedOption) {
      alert("Please select a payment method")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    setPaymentStatus("")

    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% success rate
      if (success) {
        setPaymentStatus("success")
        const transactionId = "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase()
        alert(`Payment Successful! Transaction ID: ${transactionId}`)
      } else {
        setPaymentStatus("failed")
        alert("Payment Failed. Please try again.")
      }
      setIsProcessing(false)
    }, 2000)
  }

  const handleDownload = () => {
   
    const link = document.createElement('a')
    link.href = './pngegg (4).png'
    link.download = 'flight-ticket.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const amount = 1299.0 // Example amount

  // If payment is successful, show only success message and download button
  if (paymentStatus === "success") {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        background: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <img 
            src="/pngegg (4).png" 
            alt="Flight Ticket" 
            style={{
              width: '25rem',
              height: '20rem',
              marginBottom: '20px',
              borderRadius: '12px'
            }}
          />
          <h2 style={{
            color: '#28a745',
            margin: '0 0 30px 0',
            fontSize: '24px', 1``
            fontWeight: '600'
          }}>
            Payment Successful!
          </h2>
          <button
            onClick={handleDownload}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            Download Ticket
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          color: '#333',
          margin: '0 0 15px 0',
          fontSize: '24px',
          fontWeight: '600'
        }}>Complete Your Payment</h2>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <span style={{
            fontSize: '28px',
            fontWeight: 'bold'
          }}>₹{amount.toFixed(2)}</span>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          color: '#333',
          fontSize: '18px',
          fontWeight: '600'
        }}>Select Payment Method</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '15px'
        }}>
          {paymentOptions.map((option) => (
            <label key={option.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              border: `2px solid ${selectedOption === option.id ? '#667eea' : '#e1e5e9'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: selectedOption === option.id ? '#f0f4ff' : '#fafbfc',
              boxShadow: selectedOption === option.id ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none'
            }}>
              <input
                type="radio"
                name="paymentMethod"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                style={{ display: 'none' }}
              />
              <span style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}>
                <span style={{
                  fontSize: '24px',
                  marginRight: '12px'
                }}>{option.icon}</span>
                <span style={{
                  fontWeight: '500',
                  color: '#333'
                }}>{option.label}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {selectedOption === "card" && (
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600'
          }}>Card Details</h3>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555'
            }}>Card Number</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => handleCardInputChange("number", e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.number ? '#e74c3c' : '#e1e5e9'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {getCardType(cardDetails.number) && (
                <span style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#667eea',
                  background: '#f0f4ff',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>{getCardType(cardDetails.number)}</span>
              )}
            </div>
            {errors.number && (
              <span style={{
                color: '#e74c3c',
                fontSize: '14px',
                marginTop: '5px',
                display: 'block'
              }}>{errors.number}</span>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555'
            }}>Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => handleCardInputChange("name", e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.name ? '#e74c3c' : '#e1e5e9'}`,
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && (
              <span style={{
                color: '#e74c3c',
                fontSize: '14px',
                marginTop: '5px',
                display: 'block'
              }}>{errors.name}</span>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#555'
              }}>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.expiry ? '#e74c3c' : '#e1e5e9'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.expiry && (
                <span style={{
                  color: '#e74c3c',
                  fontSize: '14px',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.expiry}</span>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#555'
              }}>CVV</label>
              <input
                type="password"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${errors.cvv ? '#e74c3c' : '#e1e5e9'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.cvv && (
                <span style={{
                  color: '#e74c3c',
                  fontSize: '14px',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.cvv}</span>
              )}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666'
            }}>
              <input
                type="checkbox"
                checked={cardDetails.saveCard}
                onChange={(e) => setCardDetails((prev) => ({ ...prev, saveCard: e.target.checked }))}
                style={{ marginRight: '8px', width: 'auto' }}
              />
              <span>Save card for future payments</span>
            </label>
          </div>
        </div>
      )}

      {selectedOption === "upi" && (
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600'
          }}>UPI Payment</h3>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555'
            }}>UPI ID</label>
            <input
              type="text"
              placeholder="yourname@upi or 9876543210@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.upi ? '#e74c3c' : '#e1e5e9'}`,
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            {errors.upi && (
              <span style={{
                color: '#e74c3c',
                fontSize: '14px',
                marginTop: '5px',
                display: 'block'
              }}>{errors.upi}</span>
            )}
          </div>
          <div style={{
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <p style={{
              marginBottom: '15px',
              color: '#666'
            }}>Or pay using your favorite UPI app:</p>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                background: '#5f259f',
                color: 'white'
              }}>PhonePe</button>
              <button style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                background: '#4285f4',
                color: 'white'
              }}>Google Pay</button>
              <button style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                background: '#00baf2',
                color: 'white'
              }}>Paytm</button>
            </div>
          </div>
        </div>
      )}

      {(selectedOption === "phonepay" || selectedOption === "googlepay" || selectedOption === "paytm") && (
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600'
          }}>{paymentOptions.find((opt) => opt.id === selectedOption)?.label} Payment</h3>
          <div style={{
            textAlign: 'center',
            padding: '20px'
          }}>
            <p>
              You will be redirected to {paymentOptions.find((opt) => opt.id === selectedOption)?.label} to complete
              your payment.
            </p>
            <div style={{ marginTop: '20px' }}>
              <div style={{
                width: '200px',
                height: '200px',
                border: '2px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                color: '#999',
                borderRadius: '8px'
              }}>QR Code will appear here</div>
            </div>
          </div>
        </div>
      )}

      {selectedOption === "netbanking" && (
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600'
          }}>Net Banking</h3>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555'
            }}>Select Your Bank</label>
            <select style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}>
              <option value="">Choose your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
            </select>
          </div>
        </div>
      )}

      {selectedOption && (
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600'
          }}>Payment Summary</h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <span>Amount:</span>
            <span>₹{amount.toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <span>Payment Method:</span>
            <span>{paymentOptions.find((opt) => opt.id === selectedOption)?.label}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#333',
            borderTop: '2px solid #e1e5e9',
            marginTop: '10px',
            paddingTop: '15px'
          }}>
            <span>Total Amount:</span>
            <span>₹{amount.toFixed(2)}</span>
          </div>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isProcessing || !selectedOption}
        style={{
          width: '100%',
          padding: '16px',
          background: isProcessing ? '#95a5a6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: isProcessing || !selectedOption ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          opacity: isProcessing || !selectedOption ? 0.6 : 1
        }}
      >
        {isProcessing ? (
          <>
            <span style={{
              width: '20px',
              height: '20px',
              border: '2px solid #ffffff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></span>
            Processing...
          </>
        ) : (
          `Pay ₹${amount.toFixed(2)}`
        )}
      </button>

      {paymentStatus === "failed" && (
        <div style={{
          textAlign: 'center',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
          fontWeight: '600',
          background: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb'
        }}>❌ Payment Failed!</div>
      )}
    </div>
  )
}

export default Payment