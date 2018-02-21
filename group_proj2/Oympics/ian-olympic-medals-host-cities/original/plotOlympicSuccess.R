#!/usr/bin/env Rscript

# load file and get rid of 0 values for log
t <- read.csv('Summer Olympics joined.csv')
inds_rm <- which(t$no_games==0 | t$total_summer==0)

# variables of interest
x <- t$no_games[-inds_rm]
y <- log10(t$total_summer[-inds_rm] / x)

# correlation statistics
cc <- cor.test.0(x,y,method='s')
rho <- cc$estimate
pv <- cc$p.value


png('plotOlympicSuccess.png',width=7,height=7,unit='in',res=300)
par(mar = c(6,6,5,5), 
    cex.lab = 1.3, 
    cex.axis = 1.3, 
    cex.main = 1, 
    pch = 19
    )
plot(x,y,
       xlab='Number of participations',
       ylab='Number of medals per participation (log10)',
       main=paste0('Country success in the summer Olympics\nSpearman\'s rho = ',
                   signif(rho,2),' (p=',signif(pv,2),')\n')
       )
abline(lm(y~x))
dev.off()


