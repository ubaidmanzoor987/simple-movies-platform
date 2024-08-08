'use client';
import Image from '@/components/ui/image';

export default function Loading() {
  return (
    <div className="bg-brand-light w-full h-[100vh] flex items-center justify-center ">
      <div className="animate-zoom">
        <Image src="/images/Logo.svg" alt="logo" width={120} height={120} />
      </div>
    </div>
  );
}
