import { useState } from "react";

const tabs = ["Tổng Quan", "On-chain vs Off-chain", "Kiến Trúc", "Payment Flow", "Giải Thích"];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 8.5L6.5 12L13 4" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 4L12 12M12 4L4 12" />
  </svg>
);

const BlockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="6" width="16" height="10" rx="1" />
    <path d="M2 9h16" />
    <path d="M6 6V4a4 4 0 018 0v2" />
  </svg>
);

const DbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="10" cy="5" rx="7" ry="3" />
    <path d="M3 5v10c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
    <path d="M3 10c0 1.66 3.13 3 7 3s7-1.34 7-3" />
  </svg>
);

export default function PaymentArchitecture() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e6e3",
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "40px 32px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #e94560, #c23152)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18
            }}>🎨</div>
            <span style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "#e94560", fontWeight: 600 }}>
              ArtChain Marketplace
            </span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 4px", color: "#fff" }}>
            Payment Module — Blockchain Architecture
          </h1>
          <p style={{ fontSize: 14, color: "#8892b0", margin: 0 }}>
            Kiến trúc thanh toán kết hợp Blockchain cho website bán tranh vật lý
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "#0d0d14",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: "14px 20px",
              background: "none", border: "none", cursor: "pointer",
              color: activeTab === i ? "#e94560" : "#6b7280",
              fontWeight: activeTab === i ? 700 : 400,
              fontSize: 14,
              borderBottom: activeTab === i ? "2px solid #e94560" : "2px solid transparent",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 60px" }}>
        {activeTab === 0 && <OverviewTab />}
        {activeTab === 1 && <DataSplitTab />}
        {activeTab === 2 && <ArchitectureTab />}
        {activeTab === 3 && <PaymentFlowTab />}
        {activeTab === 4 && <ExplanationTab />}
      </div>
    </div>
  );
}

/* ──────────── TAB 0: OVERVIEW ──────────── */
function OverviewTab() {
  return (
    <div>
      <SectionTitle>Tổng quan dự án</SectionTitle>
      <p style={pStyle}>
        <strong style={{ color: "#e94560" }}>ArtChain</strong> là website marketplace kết nối <strong>Artists</strong> (họa sĩ) 
        và <strong>Guests/Buyers</strong> (người mua). Nền tảng cho phép đăng bán tranh vật lý, trưng bày gallery, 
        và thanh toán được ghi nhận trên blockchain để đảm bảo <em>minh bạch, chống gian lận, và tạo chứng nhận sở hữu</em>.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, margin: "24px 0" }}>
        <FeatureCard emoji="💎" title="Điểm đặc biệt" items={[
          "Thanh toán Escrow trên Smart Contract — tiền chỉ chuyển cho artist khi buyer xác nhận nhận tranh",
          "NFT Certificate of Authenticity — mỗi bức tranh bán ra đi kèm NFT chứng nhận nguồn gốc",
          "Lịch sử giao dịch minh bạch, không thể giả mạo trên blockchain",
        ]} accent="#e94560" />
        <FeatureCard emoji="🛠" title="Tech Stack" items={[
          "Frontend: React.js + ethers.js",
          "Backend: Node.js / Express + MongoDB",
          "Blockchain: Solidity trên Sepolia Testnet",
          "Wallet: MetaMask Integration",
        ]} accent="#3b82f6" />
        <FeatureCard emoji="📐" title="Scope đồ án SV" items={[
          "1 Smart Contract (Escrow + NFT mint)",
          "Thanh toán ETH qua MetaMask",
          "CRUD cơ bản cho artwork & orders",
          "Chứng nhận sở hữu dạng NFT đơn giản",
        ]} accent="#10b981" />
      </div>

      <div style={{
        background: "rgba(233,69,96,0.08)", border: "1px solid rgba(233,69,96,0.2)",
        borderRadius: 10, padding: "16px 20px", marginTop: 20,
      }}>
        <strong style={{ color: "#e94560" }}>💡 Cái hay & đặc biệt:</strong>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Thay vì chỉ đơn thuần "thanh toán crypto", hệ thống kết hợp <strong>Escrow pattern</strong> (bảo vệ cả buyer lẫn artist) 
          và <strong>NFT Certificate</strong> (chứng nhận tính xác thực tranh vật lý thông qua blockchain) — 
          đây là mô hình đang được các gallery thực tế áp dụng, phù hợp để trình bày đồ án.
        </p>
      </div>
    </div>
  );
}

/* ──────────── TAB 1: DATA SPLIT ──────────── */
function DataSplitTab() {
  const onChain = [
    { data: "Payment Transaction Hash", reason: "Bằng chứng thanh toán không thể giả mạo" },
    { data: "Escrow State (Paid → Confirmed → Released / Refunded)", reason: "Trạng thái escrow minh bạch, trustless" },
    { data: "Số tiền thanh toán (ETH)", reason: "Ghi nhận giá trị giao dịch chính xác" },
    { data: "Wallet Address (buyer & artist)", reason: "Định danh các bên tham gia giao dịch" },
    { data: "NFT Certificate of Authenticity", reason: "Chứng nhận nguồn gốc & quyền sở hữu tranh" },
    { data: "Timestamp giao dịch", reason: "Mốc thời gian không thể sửa đổi" },
  ];

  const offChain = [
    { data: "Thông tin User (tên, email, avatar, password)", reason: "Dữ liệu cá nhân — GDPR, cần update thường xuyên" },
    { data: "Chi tiết Artwork (tên, mô tả, ảnh, giá hiển thị)", reason: "Dung lượng lớn (ảnh), thay đổi liên tục" },
    { data: "Gallery & Exhibition data", reason: "Nội dung động, không cần immutable" },
    { data: "Shopping Cart & Wishlist", reason: "Dữ liệu tạm thời, thay đổi liên tục" },
    { data: "Order Details (địa chỉ ship, tracking, notes)", reason: "Thông tin nhạy cảm & riêng tư" },
    { data: "Chat / Messages giữa artist & buyer", reason: "Dung lượng lớn, riêng tư" },
    { data: "Reviews & Ratings", reason: "Có thể edit/delete, không cần immutable" },
    { data: "Session, Auth Tokens", reason: "Dữ liệu tạm, hết hạn liên tục" },
  ];

  return (
    <div>
      <SectionTitle>Phân tách dữ liệu On-chain vs Off-chain</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {/* On-chain */}
        <div style={{
          background: "linear-gradient(180deg, rgba(233,69,96,0.06) 0%, rgba(233,69,96,0.02) 100%)",
          border: "1px solid rgba(233,69,96,0.2)", borderRadius: 12, padding: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ color: "#e94560" }}><BlockIcon /></div>
            <h3 style={{ margin: 0, fontSize: 18, color: "#e94560" }}>🔗 On-chain (Blockchain)</h3>
          </div>
          <p style={{ fontSize: 12, color: "#8892b0", marginTop: 0, fontStyle: "italic" }}>
            Nguyên tắc: Chỉ lưu những gì CẦN minh bạch, bất biến, và trustless
          </p>
          {onChain.map((item, i) => (
            <div key={i} style={{
              background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "12px 14px",
              marginBottom: 8, borderLeft: "3px solid #e94560",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ color: "#10b981" }}><CheckIcon /></span>
                <strong style={{ fontSize: 13, color: "#f0f0f0" }}>{item.data}</strong>
              </div>
              <p style={{ fontSize: 12, color: "#8892b0", margin: 0, paddingLeft: 24 }}>{item.reason}</p>
            </div>
          ))}
        </div>

        {/* Off-chain */}
        <div style={{
          background: "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%)",
          border: "1px solid rgba(59,130,246,0.2)", borderRadius: 12, padding: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ color: "#3b82f6" }}><DbIcon /></div>
            <h3 style={{ margin: 0, fontSize: 18, color: "#3b82f6" }}>🗄 Off-chain (Backend + DB)</h3>
          </div>
          <p style={{ fontSize: 12, color: "#8892b0", marginTop: 0, fontStyle: "italic" }}>
            Nguyên tắc: Dữ liệu lớn, thay đổi thường xuyên, nhạy cảm, hoặc tạm thời
          </p>
          {offChain.map((item, i) => (
            <div key={i} style={{
              background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "12px 14px",
              marginBottom: 8, borderLeft: "3px solid #3b82f6",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ color: "#f59e0b" }}><XIcon /></span>
                <strong style={{ fontSize: 13, color: "#f0f0f0" }}>{item.data}</strong>
              </div>
              <p style={{ fontSize: 12, color: "#8892b0", margin: 0, paddingLeft: 24 }}>{item.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div style={{ marginTop: 28, overflowX: "auto" }}>
        <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 12 }}>📊 Bảng so sánh tổng hợp</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.05)" }}>
              {["Tiêu chí", "On-chain", "Off-chain"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#ccc", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Chi phí lưu trữ", "Rất cao (gas fee)", "Thấp"],
              ["Tốc độ truy vấn", "Chậm (consensus)", "Nhanh"],
              ["Tính bất biến", "✅ Không thể sửa/xóa", "❌ Có thể CRUD"],
              ["Tính riêng tư", "❌ Public (ai cũng xem được)", "✅ Kiểm soát access"],
              ["Dung lượng", "Rất giới hạn", "Gần như không giới hạn"],
              ["Phù hợp cho", "Giao dịch, chứng nhận", "Profile, content, media"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "10px 14px", color: "#ccc", fontWeight: 500 }}>{row[0]}</td>
                <td style={{ padding: "10px 14px", color: "#e94560" }}>{row[1]}</td>
                <td style={{ padding: "10px 14px", color: "#3b82f6" }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ──────────── TAB 2: ARCHITECTURE ──────────── */
function ArchitectureTab() {
  const layers = [
    {
      label: "USER / BUYER", color: "#8b5cf6", icon: "👤",
      desc: "Truy cập website, kết nối MetaMask wallet",
      items: ["Browser / Mobile", "MetaMask Wallet"],
    },
    {
      label: "FRONTEND (React.js)", color: "#3b82f6", icon: "🖥",
      desc: "Giao diện người dùng, gọi API & tương tác Smart Contract",
      items: ["React Components", "ethers.js (Web3)", "Axios (REST API)", "MetaMask SDK"],
    },
    {
      label: "BACKEND (Node.js + Express)", color: "#10b981", icon: "⚙️",
      desc: "Xử lý business logic, lưu trữ off-chain, xác thực",
      items: ["REST API Endpoints", "MongoDB (Users, Artworks, Orders)", "JWT Authentication", "Order Management", "Webhook listener (blockchain events)"],
    },
    {
      label: "SMART CONTRACT (Solidity)", color: "#f59e0b", icon: "📜",
      desc: "Logic thanh toán escrow + mint NFT certificate",
      items: ["ArtPaymentEscrow.sol", "createOrder() — Buyer gửi ETH vào escrow", "confirmDelivery() — Buyer xác nhận → release tiền", "refund() — Hoàn tiền nếu dispute", "mintCertificate() — Mint NFT chứng nhận"],
    },
    {
      label: "BLOCKCHAIN (Ethereum Sepolia)", color: "#e94560", icon: "⛓",
      desc: "Lưu trữ giao dịch vĩnh viễn, bất biến",
      items: ["Transaction Records", "Escrow States", "NFT (ERC-721) Certificates", "Event Logs"],
    },
  ];

  return (
    <div>
      <SectionTitle>Sơ đồ kiến trúc tổng thể</SectionTitle>
      <p style={pStyle}>
        Kiến trúc theo mô hình <strong>layered architecture</strong>, mỗi tầng có trách nhiệm riêng biệt. 
        Mũi tên thể hiện luồng dữ liệu chính trong quá trình thanh toán.
      </p>

      <div style={{ position: "relative", margin: "24px 0" }}>
        {layers.map((layer, i) => (
          <div key={i}>
            {/* Arrow between layers */}
            {i > 0 && (
              <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 2, height: 16, background: `linear-gradient(${layers[i-1].color}, ${layer.color})` }} />
                  <svg width="16" height="10" viewBox="0 0 16 10">
                    <path d="M8 10L0 0h16z" fill={layer.color} />
                  </svg>
                </div>
              </div>
            )}

            {/* Layer card */}
            <div style={{
              background: `linear-gradient(135deg, ${layer.color}10, ${layer.color}05)`,
              border: `1px solid ${layer.color}35`,
              borderRadius: 12, padding: "18px 22px",
              position: "relative",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{layer.icon}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 2,
                  textTransform: "uppercase", color: layer.color,
                  background: `${layer.color}18`, padding: "3px 10px", borderRadius: 4,
                }}>{layer.label}</span>
              </div>
              <p style={{ fontSize: 13, color: "#8892b0", margin: "4px 0 10px" }}>{layer.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {layer.items.map((item, j) => (
                  <span key={j} style={{
                    fontSize: 11, background: "rgba(0,0,0,0.4)",
                    color: "#d1d5db", padding: "4px 10px", borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data flow summary */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: 20, marginTop: 20,
      }}>
        <h4 style={{ margin: "0 0 12px", color: "#fff", fontSize: 15 }}>📡 Luồng dữ liệu chi tiết</h4>
        <div style={{ fontSize: 13, lineHeight: 2, color: "#a0aec0" }}>
          <div><strong style={{ color: "#8b5cf6" }}>①</strong> User kết nối MetaMask → Frontend nhận wallet address</div>
          <div><strong style={{ color: "#3b82f6" }}>②</strong> Frontend gọi REST API → Backend tạo order trong MongoDB</div>
          <div><strong style={{ color: "#3b82f6" }}>③</strong> Frontend gọi Smart Contract qua ethers.js → <code style={codeStyle}>createOrder(orderId)</code> + gửi ETH</div>
          <div><strong style={{ color: "#10b981" }}>④</strong> Backend lắng nghe event <code style={codeStyle}>OrderCreated</code> → cập nhật order status = "paid"</div>
          <div><strong style={{ color: "#f59e0b" }}>⑤</strong> Smart Contract giữ ETH trong escrow (trên blockchain)</div>
          <div><strong style={{ color: "#10b981" }}>⑥</strong> Buyer nhận tranh → gọi <code style={codeStyle}>confirmDelivery()</code> → ETH chuyển cho Artist</div>
          <div><strong style={{ color: "#e94560" }}>⑦</strong> Smart Contract mint NFT Certificate → gửi cho Buyer</div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── TAB 3: PAYMENT FLOW ──────────── */
function PaymentFlowTab() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "1. Buyer chọn tranh & Checkout",
      actor: "Frontend + Backend",
      color: "#3b82f6",
      details: [
        "Buyer chọn artwork, nhấn 'Buy Now'",
        "Frontend gọi POST /api/orders → Backend tạo order (status: pending)",
        "Backend trả về orderId + thông tin thanh toán",
        "Frontend hiển thị trang Payment với nút 'Pay with MetaMask'",
      ],
      code: `// Backend: POST /api/orders
const order = new Order({
  orderId: generateId(),
  buyer: req.userId,
  artist: artwork.artistId,
  artworkId: artwork._id,
  amount: artwork.priceETH,
  status: "pending",       // off-chain
  txHash: null,
});
await order.save();`,
    },
    {
      title: "2. Buyer thanh toán qua MetaMask",
      actor: "Frontend → Smart Contract",
      color: "#8b5cf6",
      details: [
        "Buyer nhấn 'Pay' → MetaMask popup yêu cầu confirm",
        "Frontend gọi contract.createOrder(orderId) + gửi ETH value",
        "Smart Contract nhận ETH, lưu vào escrow mapping",
        "Emit event OrderCreated(orderId, buyer, artist, amount)",
      ],
      code: `// Frontend: ethers.js call
const tx = await contract.createOrder(
  orderId,
  artistWalletAddress,
  { value: ethers.parseEther(priceETH) }
);
const receipt = await tx.wait();

// Update backend
await axios.patch('/api/orders/' + orderId, {
  txHash: receipt.hash,
  status: 'paid'
});`,
    },
    {
      title: "3. Smart Contract giữ Escrow",
      actor: "Blockchain (Solidity)",
      color: "#f59e0b",
      details: [
        "ETH được giữ trong Smart Contract (không ở buyer, không ở artist)",
        "Mapping: orderId → { buyer, artist, amount, status }",
        "Không ai có thể rút tiền trừ khi đúng điều kiện",
        "Artist giao tranh vật lý cho buyer (off-chain)",
      ],
      code: `// Solidity Smart Contract
mapping(string => Escrow) public escrows;

struct Escrow {
    address buyer;
    address payable artist;
    uint256 amount;
    EscrowStatus status; // Created, Confirmed, Refunded
}

function createOrder(
    string memory orderId,
    address payable artist
) external payable {
    require(msg.value > 0, "Must send ETH");
    escrows[orderId] = Escrow(
        msg.sender, artist, msg.value,
        EscrowStatus.Created
    );
    emit OrderCreated(orderId, msg.sender, artist, msg.value);
}`,
    },
    {
      title: "4. Buyer xác nhận nhận tranh",
      actor: "Frontend → Smart Contract",
      color: "#10b981",
      details: [
        "Buyer nhận tranh vật lý, vào website nhấn 'Confirm Received'",
        "Frontend gọi contract.confirmDelivery(orderId)",
        "Smart Contract chuyển ETH từ escrow → Artist wallet",
        "Đồng thời mint NFT Certificate of Authenticity → gửi cho Buyer",
      ],
      code: `// Solidity
function confirmDelivery(
    string memory orderId
) external {
    Escrow storage e = escrows[orderId];
    require(msg.sender == e.buyer);
    require(e.status == EscrowStatus.Created);
    
    e.status = EscrowStatus.Confirmed;
    e.artist.transfer(e.amount); // Release $$$
    
    // Mint NFT Certificate
    _mint(e.buyer, tokenId);
    
    emit DeliveryConfirmed(orderId);
    emit CertificateMinted(orderId, e.buyer, tokenId);
}`,
    },
    {
      title: "5. Hoàn tiền (nếu có dispute)",
      actor: "Smart Contract",
      color: "#e94560",
      details: [
        "Nếu artist không giao tranh trong thời hạn",
        "Buyer gọi contract.requestRefund(orderId)",
        "Smart Contract kiểm tra deadline, hoàn ETH cho buyer",
        "Không mint NFT — giao dịch bị hủy",
      ],
      code: `// Solidity
function requestRefund(
    string memory orderId
) external {
    Escrow storage e = escrows[orderId];
    require(msg.sender == e.buyer);
    require(e.status == EscrowStatus.Created);
    require(block.timestamp > e.deadline);
    
    e.status = EscrowStatus.Refunded;
    payable(e.buyer).transfer(e.amount);
    
    emit OrderRefunded(orderId);
}`,
    },
  ];

  return (
    <div>
      <SectionTitle>Payment Flow chi tiết</SectionTitle>
      
      {/* Step selector */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "8px 14px", fontSize: 12, fontWeight: step === i ? 700 : 400,
            background: step === i ? `${s.color}20` : "rgba(255,255,255,0.03)",
            border: `1px solid ${step === i ? s.color + "60" : "rgba(255,255,255,0.06)"}`,
            borderRadius: 8, color: step === i ? s.color : "#6b7280",
            cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>
            Step {i + 1}
          </button>
        ))}
      </div>

      {/* Active step */}
      <div style={{
        background: `linear-gradient(135deg, ${steps[step].color}08, transparent)`,
        border: `1px solid ${steps[step].color}30`,
        borderRadius: 14, padding: 24,
      }}>
        <div style={{
          display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
          textTransform: "uppercase", color: steps[step].color,
          background: `${steps[step].color}15`, padding: "4px 12px", borderRadius: 4,
          marginBottom: 8,
        }}>{steps[step].actor}</div>
        
        <h3 style={{ margin: "8px 0 16px", fontSize: 20, color: "#fff" }}>{steps[step].title}</h3>
        
        <div style={{ marginBottom: 20 }}>
          {steps[step].details.map((d, i) => (
            <div key={i} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              marginBottom: 8, fontSize: 14, color: "#c9d1d9",
            }}>
              <span style={{
                minWidth: 22, height: 22, borderRadius: "50%",
                background: `${steps[step].color}20`, color: steps[step].color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, marginTop: 1,
              }}>{i + 1}</span>
              {d}
            </div>
          ))}
        </div>

        <div style={{
          background: "#0a0a12", borderRadius: 10, padding: 16,
          border: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Fira Code', 'Cascadia Code', monospace",
          fontSize: 12, lineHeight: 1.7, color: "#a0aec0",
          overflowX: "auto", whiteSpace: "pre",
        }}>
          <div style={{ fontSize: 10, color: "#4a5568", marginBottom: 8, fontFamily: "sans-serif" }}>
            💻 Code minh họa
          </div>
          {steps[step].code}
        </div>
      </div>

      {/* Visual flow summary */}
      <div style={{ marginTop: 28 }}>
        <h4 style={{ color: "#fff", fontSize: 15, marginBottom: 14 }}>🔄 Tóm tắt luồng thanh toán</h4>
        <div style={{
          display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8,
          fontSize: 12, color: "#a0aec0",
        }}>
          {[
            { label: "Buyer chọn tranh", c: "#3b82f6" },
            { label: "Tạo Order (DB)", c: "#10b981" },
            { label: "Pay ETH → Escrow", c: "#8b5cf6" },
            { label: "Artist giao tranh", c: "#f59e0b" },
            { label: "Confirm → Release ETH", c: "#10b981" },
            { label: "Mint NFT Cert", c: "#e94560" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                background: `${s.c}20`, color: s.c, padding: "5px 12px",
                borderRadius: 6, fontWeight: 600, border: `1px solid ${s.c}30`,
                whiteSpace: "nowrap",
              }}>{s.label}</span>
              {i < 5 && <span style={{ color: "#4a5568", fontSize: 16 }}>→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────── TAB 4: EXPLANATION ──────────── */
function ExplanationTab() {
  return (
    <div>
      <SectionTitle>Giải thích kiến trúc & Lý do phân tách</SectionTitle>

      {/* Why not all on blockchain */}
      <div style={{
        background: "linear-gradient(135deg, rgba(233,69,96,0.08), rgba(233,69,96,0.02))",
        border: "1px solid rgba(233,69,96,0.25)", borderRadius: 14, padding: 24, marginBottom: 24,
      }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 18, color: "#e94560" }}>
          ❓ Vì sao KHÔNG lưu tất cả lên Blockchain?
        </h3>
        
        {[
          {
            title: "1. Chi phí Gas quá cao",
            desc: "Mỗi thao tác ghi lên blockchain đều tốn gas fee. Lưu 1KB data trên Ethereum có thể tốn hàng chục USD. Nếu lưu ảnh tranh (vài MB), thông tin user, chat... chi phí sẽ phi thực tế, đặc biệt với đồ án sinh viên.",
            icon: "💸",
          },
          {
            title: "2. Tốc độ cực chậm",
            desc: "Mỗi giao dịch blockchain cần ~15-30 giây (Ethereum) để xác nhận. Nếu mọi thao tác (xem giỏ hàng, update profile, gửi tin nhắn) đều on-chain → UX cực tệ, user phải chờ rất lâu cho mỗi action.",
            icon: "🐌",
          },
          {
            title: "3. Dữ liệu KHÔNG THỂ xóa/sửa",
            desc: "Blockchain là immutable. Nếu user muốn đổi email, xóa tin nhắn, sửa mô tả tranh → KHÔNG THỂ LÀM ĐƯỢC trên blockchain. Điều này vi phạm GDPR (quyền được quên) và không phù hợp với dữ liệu động.",
            icon: "🔒",
          },
          {
            title: "4. Vấn đề quyền riêng tư",
            desc: "Blockchain public = AI CŨNG CÓ THỂ XEM. Địa chỉ nhà, số điện thoại, lịch sử mua hàng, nội dung chat... nếu lưu on-chain thì hoàn toàn public, vi phạm nghiêm trọng privacy.",
            icon: "👁",
          },
          {
            title: "5. Giới hạn dung lượng",
            desc: "Smart Contract có giới hạn kích thước. Ảnh tranh HD, hàng nghìn reviews, chat history... không thể và không nên lưu trên blockchain. Đó là lý do cần off-chain storage.",
            icon: "📦",
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "14px 18px",
            marginBottom: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <strong style={{ fontSize: 14, color: "#f0f0f0" }}>{item.title}</strong>
            </div>
            <p style={{ fontSize: 13, color: "#8892b0", margin: 0, paddingLeft: 34, lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Why separate like this */}
      <div style={{
        background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)",
        borderRadius: 14, padding: 24, marginBottom: 24,
      }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 18, color: "#10b981" }}>
          ✅ Lý do phân tách kiến trúc như trên
        </h3>
        <div style={{ fontSize: 14, color: "#c9d1d9", lineHeight: 1.8 }}>
          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: "#10b981" }}>Nguyên tắc vàng:</strong> Chỉ đưa lên blockchain những gì THỰC SỰ CẦN tính minh bạch và bất biến. 
            Cụ thể trong hệ thống này:
          </p>
          <p style={{ margin: "0 0 8px" }}>
            <strong>• Payment & Escrow on-chain</strong> → Vì đây là phần CẦN TRUST nhất. Buyer cần biết chắc tiền đang được giữ an toàn, 
            không ai có thể lấy trộm. Smart Contract đóng vai trò "trọng tài trung lập" thay thế bên thứ 3 (ngân hàng, PayPal...).
          </p>
          <p style={{ margin: "0 0 8px" }}>
            <strong>• NFT Certificate on-chain</strong> → Chứng nhận nguồn gốc tranh cần tồn tại vĩnh viễn và không thể giả mạo. 
            Đây chính là điểm đặc biệt: liên kết tranh vật lý với digital proof trên blockchain.
          </p>
          <p style={{ margin: "0 0 8px" }}>
            <strong>• Mọi thứ khác off-chain</strong> → Profile, artwork listing, cart, chat... không cần trustless, 
            nhưng cần nhanh, rẻ, linh hoạt, và bảo mật riêng tư. MongoDB + Express xử lý tốt hơn nhiều.
          </p>
        </div>
      </div>

      {/* Hybrid approach */}
      <div style={{
        background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)",
        borderRadius: 14, padding: 24,
      }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 18, color: "#8b5cf6" }}>
          🔗 Mô hình Hybrid: Best of Both Worlds
        </h3>
        <div style={{ fontSize: 14, color: "#c9d1d9", lineHeight: 1.8 }}>
          <p style={{ margin: "0 0 12px" }}>
            Kiến trúc này áp dụng mô hình <strong>Hybrid On-chain / Off-chain</strong>, 
            là cách tiếp cận phổ biến nhất trong các dApp thực tế:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { label: "Off-chain", desc: "Tốc độ + Linh hoạt + Riêng tư", color: "#3b82f6", pct: "~90% data" },
              { label: "On-chain", desc: "Minh bạch + Bất biến + Trustless", color: "#e94560", pct: "~10% data" },
              { label: "Kết nối", desc: "Backend lắng nghe event từ blockchain, đồng bộ 2 hệ thống", color: "#f59e0b", pct: "Event-driven" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 16,
                borderTop: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 13, color: "#a0aec0", marginBottom: 6 }}>{item.desc}</div>
                <div style={{
                  fontSize: 11, background: `${item.color}15`, color: item.color,
                  padding: "2px 8px", borderRadius: 4, display: "inline-block",
                }}>{item.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── SHARED COMPONENTS ──────────── */
function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 22, fontWeight: 700, color: "#fff",
      marginBottom: 16, paddingBottom: 10,
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>{children}</h2>
  );
}

function FeatureCard({ emoji, title, items, accent }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${accent}08, ${accent}03)`,
      border: `1px solid ${accent}25`, borderRadius: 12, padding: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <strong style={{ fontSize: 15, color: accent }}>{title}</strong>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          fontSize: 13, color: "#a0aec0", lineHeight: 1.6,
          paddingLeft: 12, borderLeft: `2px solid ${accent}30`,
          marginBottom: 8,
        }}>{item}</div>
      ))}
    </div>
  );
}

const pStyle = { fontSize: 14, color: "#a0aec0", lineHeight: 1.7 };
const codeStyle = {
  background: "rgba(255,255,255,0.08)", padding: "2px 6px",
  borderRadius: 4, fontSize: 12, fontFamily: "monospace", color: "#e2e8f0",
};
