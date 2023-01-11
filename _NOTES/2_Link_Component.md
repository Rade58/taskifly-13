# Some things I discovered about `<Link></Link>`

## You can put `prefetch` PROP

IF YOU KNOW FOR SURE THAT USER IS GOING TO CLICK THE LINK YOU CAN DEFINE PAGE PREFETCHING WITH `prefetch` BOOLEAN PROP

```tsx
<Link href="/about" prefetch>
 About
</Link>
```