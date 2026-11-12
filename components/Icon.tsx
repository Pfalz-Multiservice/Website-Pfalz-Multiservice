import {
  ShoppingCart, Recycle, Warehouse, Truck, MonitorCog, Wrench, Lightbulb, Layers, FileCheck, MapPin,
  MessageCircle, Phone, Mail, Check, ArrowRight, ChevronDown, ChevronRight, CircleArrowRight, Star, Menu, X, ArrowUp, ExternalLink, LayoutTemplate, Clapperboard, Camera, PenTool, Languages,
  KeyRound, LockKeyhole, FolderCode, Copyright, SearchCheck, ClipboardList, Gauge, PencilLine,
  Search, SlidersHorizontal, CalendarDays, Ticket, Sparkles, Smartphone, Gift, PackageCheck,
  Blinds, CirclePlus, RefreshCw, ShieldCheck, Thermometer, Network, PhoneOff, SearchX, Receipt, UserX,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/data";

const MAP = {
  "shopping-cart": ShoppingCart, recycle: Recycle, warehouse: Warehouse, truck: Truck, "monitor-cog": MonitorCog,
  wrench: Wrench, lightbulb: Lightbulb, layers: Layers, "file-check": FileCheck, "map-pin": MapPin,
  "message-circle": MessageCircle, phone: Phone, mail: Mail, check: Check, "arrow-right": ArrowRight,
  "chevron-down": ChevronDown, "chevron-right": ChevronRight, "circle-arrow-right": CircleArrowRight, star: Star,
  menu: Menu, x: X, "arrow-up": ArrowUp, "external-link": ExternalLink, "layout-template": LayoutTemplate,
  clapperboard: Clapperboard, camera: Camera, "pen-tool": PenTool, languages: Languages,
  "key-round": KeyRound, "lock-keyhole": LockKeyhole, "folder-code": FolderCode, copyright: Copyright,
  "search-check": SearchCheck, "clipboard-list": ClipboardList, gauge: Gauge, "pencil-line": PencilLine,
  search: Search, "sliders-horizontal": SlidersHorizontal, "calendar-days": CalendarDays, ticket: Ticket,
  sparkles: Sparkles, smartphone: Smartphone, gift: Gift, "package-check": PackageCheck,
  blinds: Blinds, "circle-plus": CirclePlus, "refresh-cw": RefreshCw, "shield-check": ShieldCheck, thermometer: Thermometer, network: Network,
  "phone-off": PhoneOff, "search-x": SearchX, receipt: Receipt, "user-x": UserX,
} as const;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & Omit<LucideProps, "ref">) {
  const C = MAP[name];
  return <C size={size} strokeWidth={2} aria-hidden="true" {...rest} />;
}
