"""
Generate the placeholder resume PDF served at public/resume.pdf.

Produces a minimal, valid PDF 1.4 using only base-14 Helvetica fonts
(nothing to embed). Replace public/resume.pdf with a real resume anytime;
the site just serves whatever file lives there.

Usage: python scripts/generate_resume_pdf.py
"""

import pathlib
import sys

W, H = 595, 842  # A4 in points
GOLD = (0.812, 0.639, 0.333)  # #cfa355
INK = (0.12, 0.12, 0.12)
GRAY = (0.45, 0.45, 0.45)

ops = []


def rect(x, y, w, h, color):
    ops.append(f"{color[0]:.3f} {color[1]:.3f} {color[2]:.3f} rg")
    ops.append(f"{x} {y} {w} {h} re f")


def text(x, y, size, s, font="F2", color=INK, charspace=0):
    color_cmd = f"{color[0]:.3f} {color[1]:.3f} {color[2]:.3f} rg"
    esc = s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")
    tc = f" {charspace} Tc" if charspace else ""
    ops.append(f"BT {color_cmd} /{font} {size} Tf{tc} {x} {y} Td ({esc}) Tj ET")


# --- Header ---
rect(40, H - 56, W - 80, 6, GOLD)
text(40, H - 100, 30, "MOHAMED ZAHRAN", font="F1")
text(40, H - 122, 12.5, "FRONTEND ENGINEER", color=GRAY, charspace=2.2)
text(40, H - 142, 10, "info@mzahran.tech   |   +20 109 208 8922   |   github.com/Zahrannnn   |   Cairo, EG", color=GRAY)
rect(40, H - 156, W - 80, 0.8, GRAY)

# --- Experience ---
y = H - 190
text(40, y, 13, "EXPERIENCE", font="F1", charspace=1.5)
rect(40, y - 6, 92, 1.6, GOLD)
jobs = [
    (
        "Frontend Developer - RICOH Europe (formerly CORELIA)",
        "Nov 2025 - present",
        "CORELIA 3D Building & Space Viewer, Tailgating Detection System,\nAGL Invoice Management, Qalam Vision NLP tooling.",
    ),
    (
        "Frontend Developer - NedSwiss, Switzerland",
        "Feb 2025 - Nov 2025",
        "Multilingual CRM dashboard and marketing website with Next.js 15.",
    ),
    (
        "Frontend Lead - GDSC, Shorouk Academy",
        "2023 - 2025",
        "React and TypeScript workshops for 50+ students.",
    ),
]
for title, span, body in jobs:
    y -= 34
    text(40, y, 11, title, font="F1")
    tw = 300  # right-align the date roughly
    text(W - 40 - 110, y, 9.5, span, color=GRAY)
    for line in body.split("\n"):
        y -= 15
        text(40, y, 10, line, color=GRAY)
    y -= 6

# --- Education ---
y -= 14
text(40, y, 13, "EDUCATION", font="F1", charspace=1.5)
rect(40, y - 6, 92, 1.6, GOLD)
y -= 34
text(40, y, 11, "BSc Computer Science - Shorouk Academy, Cairo", font="F1")
y -= 15
text(40, y, 10, "GPA 3.8/4.0", color=GRAY)

# --- Skills ---
y -= 30
text(40, y, 13, "SKILLS", font="F1", charspace=1.5)
rect(40, y - 6, 92, 1.6, GOLD)
y -= 32
text(40, y, 10, "TypeScript, React 19, Next.js 15/16, Redux Toolkit, TanStack Query,")
y -= 15
text(40, y, 10, "React Three Fiber / Three.js, GSAP, Tailwind CSS v4, RTL + next-intl,")
y -= 15
text(40, y, 10, "Vitest, Zod, Docker.")

# --- Footer ---
rect(40, 56, W - 80, 0.8, GRAY)
text(40, 42, 9, "mzahran.tech - placeholder resume, replace public/resume.pdf", color=GRAY)

content = ("\n".join(ops)).encode("latin-1")

objs = [
    b"<< /Type /Catalog /Pages 2 0 R >>",
    b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    (
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] "
        b"/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>"
    ),
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    b"<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream",
]

out = bytearray(b"%PDF-1.4\n")
offsets = []
for i, body in enumerate(objs, start=1):
    offsets.append(len(out))
    out += f"{i} 0 obj\n".encode() + body + b"\nendobj\n"

xref_pos = len(out)
out += f"xref\n0 {len(objs) + 1}\n".encode()
out += b"0000000000 65535 f \n"
for off in offsets:
    out += f"{off:010d} 00000 n \n".encode()
out += (
    f"trailer\n<< /Size {len(objs) + 1} /Root 1 0 R >>\n"
    f"startxref\n{xref_pos}\n%%EOF\n"
).encode()

dest = pathlib.Path(__file__).resolve().parent.parent / "public" / "resume.pdf"
if dest.exists() and "--force" not in sys.argv:
    print(f"refusing to overwrite existing {dest} (pass --force to overwrite)")
    raise SystemExit(1)
dest.write_bytes(bytes(out))
print(f"wrote {dest} ({len(out)} bytes)")
