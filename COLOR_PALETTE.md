# Custom Brand Color Palette

This document showcases all the custom brand colors available in the application. All shadcn/ui components have been configured to use these colors exclusively.

## Primary Brand Colors

### Allai Blue
- `--allai-blue-20`: #0A0066 - Darkest blue
- `--allai-blue-30`: #0E0099 - Very dark blue
- `--allai-blue-50`: #1800FF - **Main brand blue**
- `--allai-blue-55`: #2F1AFF - Medium blue
- `--allai-blue-60`: #4633FF - Light medium blue
- `--allai-blue-70`: #6680FF - Light blue
- `--allai-blue-90`: #CCDDFF - Very light blue

## System Neutral Colors

### Neutral Scale (Light to Dark)
- `--system-neutral-99`: #FCFCFE - Almost white
- `--system-neutral-95`: #F3F6FA - Very light gray
- `--system-neutral-90`: #DFE8F1 - Light gray
- `--system-neutral-85`: #CBD9E7 - Light medium gray
- `--system-neutral-80`: #C2CCD6 - Medium light gray
- `--system-neutral-65`: #98A1B4 - Medium gray
- `--system-neutral-55`: #7A869E - Dark medium gray
- `--system-neutral-35`: #4B5267 - Dark gray
- `--system-neutral-30`: #404659 - Very dark gray
- `--system-neutral-25`: #363B4A - Darker gray
- `--system-neutral-20`: #2B2F3B - Even darker gray
- `--system-neutral-15`: #20232C - Almost black
- `--system-neutral-10`: #15171E - Near black
- `--system-neutral-05`: #06080F - Almost pure black

## Accent Colors

### Flamingo Rose (Error/Destructive)
- `--flamingo-rose-30`: #7B211E - Dark red
- `--flamingo-rose-50`: #CD3732 - Medium red
- `--flamingo-rose-60`: #D75F5B - Light red
- `--flamingo-rose-70`: #E18984 - Very light red

### Fluor Green (Success)
- `--fluor-green-20`: #0B6600 - Dark green
- `--fluor-green-30`: #109900 - Medium green
- `--fluor-green-40`: #16CC00 - Bright green

### Light Orange (Warning)
- `--light-orange-40`: #CC8400 - Dark orange
- `--light-orange-60`: #FFB733 - Medium orange
- `--light-orange-70`: #FFC966 - Light orange

### Tangerine Orange (Secondary Accent)
- `--tangerine-orange-70`: #FFA266 - Light tangerine

## Additional Colors

### Bronze
- `--bronze-30`: #764623 - Dark bronze
- `--bronze-55`: #CA814E - Medium bronze
- `--bronze-65`: #D69E76 - Light bronze
- `--bronze-90`: #F3E3D8 - Very light bronze

### Silver
- `--silver-30`: #484C51 - Dark silver
- `--silver-70`: #AEB2B7 - Light silver
- `--silver-80`: #C9CBCF - Very light silver
- `--silver-90`: #E4E5E7 - Almost white silver

### Gold
- `--gold-25`: #72540D - Dark gold
- `--gold-60`: #EAB948 - Medium gold
- `--gold-75`: #F2D38D - Light gold
- `--gold-95`: #FCF6E8 - Very light gold

### Purple
- `--purple-45`: #7345A1 - Medium purple
- `--purple-70`: #B394D1 - Light purple
- `--purple-75`: #C0A6D9 - Lighter purple
- `--purple-90`: #E6DBF0 - Very light purple

## Usage in Components

All shadcn/ui components automatically use these colors through the mapped CSS variables:

- **Primary buttons**: Use `allai-blue-50/60`
- **Secondary elements**: Use `system-neutral` colors
- **Error states**: Use `flamingo-rose` colors
- **Success states**: Use `fluor-green` colors
- **Warning states**: Use `light-orange` colors

## Tailwind Classes

You can use these colors directly in Tailwind classes:

```jsx
// Text colors
<p className="text-allai-blue-50">Primary text</p>
<p className="text-system-neutral-05">Dark text</p>

// Background colors
<div className="bg-system-neutral-99">Light background</div>
<div className="bg-allai-blue-50">Primary background</div>

// Border colors
<div className="border-system-neutral-85">Light border</div>
<div className="border-allai-blue-50">Primary border</div>

// Dark mode (colors automatically adjust)
<div className="bg-background text-foreground">
  Automatically uses system-neutral-99/10 based on theme
</div>
```

## Important Notes

1. **Never use default Tailwind colors** (e.g., `text-blue-500`, `bg-gray-100`)
2. **Always use the custom brand colors** defined above
3. **shadcn/ui components** automatically use the correct colors
4. **Dark mode** is fully supported with appropriate color mappings